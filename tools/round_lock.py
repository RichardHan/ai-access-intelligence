"""維護回合鎖：同一個 repo 一次只讓一個寫入者動 data/*.json。

為什麼需要：2026-11-11 12:04 這輪開始時，另一個同題目的維護回合（11:15 開始）仍在跑，
兩邊讀寫同一份 6MB 的 data/offers.json。實際後果有兩件，都不會在測試裡出現：
1) 讀到別人的半成品——那一輪自己的紀錄寫著「同一時段另一個 session 的寫入讓我看到一次
   59,149 行的假 diff（檔期中間狀態）」，本輪也在同一分鐘看到 6MB 檔案被整份重寫。
2) 重複研究同一筆——今天兩輪都排到 `aocai-working-free-ai-courses-2026`（截止 12:30），
   等於把稀缺的查核時間花在同一個官方頁上，而同時還有 1,000 筆可行動紀錄沒人碰。

做法是最小的一種：repo 根目錄一個 `.round-lock.json`（已列入 .gitignore），內容是
pid／主機／開始時間／備註。判斷「有沒有人在跑」用 pid 是否還活著（os.kill(pid, 0)），
不靠心跳或超時——回合結束就 release，程序被砍掉則下次 acquire 會把死掉的鎖接管。

用法：
  python3 tools/round_lock.py status                   # 現在有沒有人在寫
  python3 tools/round_lock.py acquire --note "12:04"   # 預設記父程序 ppid，也可用 --pid 指定
  python3 tools/round_lock.py release                  # 同父程序釋放；殘留鎖可用 --force 清除
  python3 tools/round_lock.py --self-test              # 以暫存目錄驗證跨子程序生命週期、接管與拒絕規則
它不阻止任何人寫檔（沒有強制力），但讓「現在有另一個回合在跑」變成一行可查的輸出，
而不是要等到 git diff 出現幾萬行才發現。搶到鎖之後仍應先跑 `tools/queue.py`，
避免兩輪挑到同一個 ID。
"""
import argparse
import datetime
import json
import os
import pathlib
import socket
import sys
import tempfile

ROOT = pathlib.Path(__file__).resolve().parents[1]
LOCK = ROOT / ".round-lock.json"
TZ = datetime.timezone(datetime.timedelta(hours=8))


def now_iso():
    return datetime.datetime.now(TZ).replace(microsecond=0).isoformat()


def alive(pid):
    try:
        os.kill(int(pid), 0)
    except (OSError, ValueError, TypeError):
        return False
    return True


def read_lock(path):
    try:
        return json.loads(path.read_text())
    except (OSError, ValueError):
        return None


def default_pid():
    """CLI 每次呼叫都是短命的 python 子程序，指令返回後該 pid 立即消失（下一秒 status 就變 STALE、
    回合結束 release 也會因新舊 python pid 不同而被拒）。預設改記父程序（shell／agent runner）
    的 ppid，跨指令的 acquire → status → release 才會指向同一個還活著的持有者。
    """
    ppid = os.getppid()
    return ppid if ppid > 1 else os.getpid()


def acquire(path, pid=None, host=None, note="", stamp=None):
    """回傳 (ok, message)。活著的持有者存在時不接管——那是別人的回合。"""
    pid = default_pid() if pid is None else int(pid)
    host = socket.gethostname() if host is None else host
    stamp = now_iso() if stamp is None else stamp
    current = read_lock(path)
    if current:
        same_host = current.get("host") == host
        if same_host and alive(current.get("pid")):
            return False, (f"another round is running: pid {current['pid']} since "
                           f"{current.get('started_at')}（{current.get('note') or 'no note'}）")
        stale = f"stale lock from pid {current.get('pid')}（{'同一台主機但程序已結束' if same_host else '不同主機'}）"
    else:
        stale = None
    path.write_text(json.dumps({"pid": pid, "host": host, "started_at": stamp, "note": note},
                               ensure_ascii=False, indent=2))
    return True, (f"locked by pid {pid} at {stamp}" + (f"; took over {stale}" if stale else ""))


def release(path, pid=None, force=False):
    pid = default_pid() if pid is None else int(pid)
    current = read_lock(path)
    if not current:
        return False, "no lock to release"
    if not force and current.get("pid") != pid:
        return False, f"lock is held by pid {current.get('pid')}, not {pid}; refusing to release (use --force if stale)"
    path.unlink()
    return True, "released"

def status(path):
    current = read_lock(path)
    if not current:
        return "no round lock: nobody claimed this repo"
    live = current.get("host") == socket.gethostname() and alive(current.get("pid"))
    return (f"{'RUNNING' if live else 'STALE'}: pid {current.get('pid')} on {current.get('host')} "
            f"since {current.get('started_at')}（{current.get('note') or 'no note'}）")


def self_test():
    with tempfile.TemporaryDirectory() as tmp:
        path = pathlib.Path(tmp) / ".round-lock.json"
        me = os.getpid()
        assert "no round lock" in status(path), "空目錄應回沒有鎖"
        ok, msg = acquire(path, pid=me, host=socket.gethostname(), note="first",
                          stamp="2026-11-11T12:00:00+08:00")
        assert ok and "locked" in msg, msg
        # 同主機、活的 pid：不得接管
        other = me + 1 if me + 1 != me else me + 2
        ok2, msg2 = acquire(path, pid=other, host=socket.gethostname(), note="second")
        assert not ok2, "活著的持有者不得被接管"
        assert f"pid {me}" in msg2, msg2
        assert "RUNNING" in status(path), status(path)
        # 不同主機無法判斷對方死活，只能接管並講清楚
        ok3, msg3 = acquire(path, pid=other, host="other-host", note="third")
        assert ok3 and "took over" in msg3, msg3
        assert json.loads(path.read_text())["pid"] == other, "接管後鎖應指向新的 pid"
        # 只有持有者能釋放
        ok4, msg4 = release(path, pid=me)
        assert not ok4 and f"held by pid {other}" in msg4, msg4
        ok5, msg5 = release(path, pid=other)
        assert ok5, msg5
        assert "no round lock" in status(path), "release 後應回到沒有鎖"
        # pid 已死＝殘留鎖，必須可以接管
        path.write_text(json.dumps({"pid": 999999, "host": socket.gethostname(),
                                    "started_at": "2026-11-11T11:00:00+08:00", "note": "dead"}))
        assert "STALE" in status(path), status(path)
        ok6, msg6 = acquire(path, pid=me, host=socket.gethostname(), note="resume")
        assert ok6 and "took over" in msg6, msg6
        # 跨子程序生命週期：模擬真實 CLI 分三次獨立 python 程序呼叫 acquire → status → release，
        # 鎖在第二次呼叫時仍須是 RUNNING（記的是父程序 pid，不是已結束的子程序），且第三次呼叫可正常釋放。
        ok7, msg7 = release(path, pid=me)
        assert ok7, msg7
        import subprocess
        code = (
            "import pathlib, sys; "
            f"sys.path.insert(0, {str(ROOT / 'tools')!r}); "
            "import round_lock; "
            f"p = pathlib.Path({str(path)!r}); "
            "act = sys.argv[1]; "
            "print(round_lock.acquire(p, note='cli')[1] if act == 'acq' else "
            "round_lock.status(p) if act == 'st' else round_lock.release(p)[1])"
        )
        out_acq = subprocess.check_output([sys.executable, "-c", code, "acq"], text=True).strip()
        assert f"locked by pid {me}" in out_acq, f"CLI acquire 應記父程序 pid {me}，實際：{out_acq}"
        out_st = subprocess.check_output([sys.executable, "-c", code, "st"], text=True).strip()
        assert out_st.startswith(f"RUNNING: pid {me}"), f"跨子程序後鎖不應立刻變 STALE：{out_st}"
        out_rel = subprocess.check_output([sys.executable, "-c", code, "rel"], text=True).strip()
        assert out_rel == "released", f"同父程序跨指令 release 應成功：{out_rel}"
        assert "no round lock" in status(path), "跨指令 release 後應回到沒有鎖"
        # --force 可清除殘留或不同 pid 的鎖
        acquire(path, pid=999999, host=socket.gethostname(), note="stale-force")
        ok8, msg8 = release(path, pid=me, force=True)
        assert ok8 and msg8 == "released", msg8
    print("PASS: round lock (refuses a live holder, takes over a dead pid, tracks parent pid across CLI calls, only the owner or --force releases).")


def main():
    parser = argparse.ArgumentParser(description="同一個 repo 一次只讓一個維護回合寫入")
    parser.add_argument("action", nargs="?", choices=["status", "acquire", "release"], default="status")
    parser.add_argument("--note", default="")
    parser.add_argument("--pid", type=int, default=None, help="指定持有鎖的 pid（預設為父程序 ppid）")
    parser.add_argument("--force", action="store_true", help="release 時強制清除鎖")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
        return
    if args.action == "acquire":
        ok, message = acquire(LOCK, pid=args.pid, note=args.note)
        print(message)
        sys.exit(0 if ok else 1)
    if args.action == "release":
        ok, message = release(LOCK, pid=args.pid, force=args.force)
        print(message)
        sys.exit(0 if ok else 1)
    print(status(LOCK))


if __name__ == "__main__":
    main()
