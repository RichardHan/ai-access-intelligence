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
import fcntl
from contextlib import contextmanager
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
    if type(pid) is not int or pid <= 0:
        return False
    try:
        os.kill(pid, 0)
    except PermissionError:
        return True
    except (ProcessLookupError, OverflowError):
        return False
    return True


@contextmanager
def locked_directory(path):
    # The directory inode is stable when the metadata is replaced or removed.
    fd = os.open(path.parent, os.O_RDONLY)
    try:
        fcntl.flock(fd, fcntl.LOCK_EX)
        yield
    finally:
        os.close(fd)


def read_lock(path):
    try:
        current = json.loads(path.read_text())
    except FileNotFoundError:
        return None
    if (not isinstance(current, dict) or type(current.get("pid")) is not int
            or current["pid"] <= 0 or not isinstance(current.get("host"), str)
            or not current["host"]):
        raise ValueError("invalid owner")
    return current


INVALID_LOCK = "invalid lock metadata; inspect the file and use release --force to clear it"


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
    if pid <= 0:
        return False, "owner pid must be positive"
    with locked_directory(path):
        try:
            current = read_lock(path)
        except ValueError:
            return False, INVALID_LOCK
        if current and current["host"] != host:
            return False, f"lock is held on {current['host']}; check the owner before release --force"
        if current and alive(current["pid"]):
            return False, (f"another round is running: pid {current['pid']} since "
                           f"{current.get('started_at')}（{current.get('note') or 'no note'}）")
        metadata = {"pid": pid, "host": host, "started_at": stamp, "note": note}
        with tempfile.NamedTemporaryFile(mode="w", dir=path.parent, delete=False) as tmp:
            try:
                json.dump(metadata, tmp, ensure_ascii=False, indent=2)
                tmp.flush()
                os.replace(tmp.name, path)
            finally:
                pathlib.Path(tmp.name).unlink(missing_ok=True)
        takeover = f"; took over stale lock from pid {current['pid']}" if current else ""
        return True, f"locked by pid {pid} at {stamp}{takeover}"


def release(path, pid=None, force=False):
    pid = default_pid() if pid is None else int(pid)
    with locked_directory(path):
        if not force:
            try:
                current = read_lock(path)
            except ValueError:
                return False, INVALID_LOCK
            if current and (current["host"] != socket.gethostname() or current["pid"] != pid):
                return False, (f"lock is held by pid {current['pid']} on {current['host']}; "
                               "refusing to release (use --force if stale)")
        try:
            path.unlink()
        except FileNotFoundError:
            return False, "no lock to release"
        return True, "released"


def status(path):
    try:
        current = read_lock(path)
    except ValueError:
        return INVALID_LOCK
    if current is None:
        return "no round lock: nobody claimed this repo"
    state = "REMOTE"
    if current["host"] == socket.gethostname():
        state = "RUNNING" if alive(current["pid"]) else "STALE"
    return (f"{state}: pid {current['pid']} on {current['host']} "
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
        ok3, _ = acquire(path, pid=other, host="other-host", note="third")
        assert not ok3 and read_lock(path)["pid"] == me
        ok4, msg4 = release(path, pid=other)
        assert not ok4 and f"held by pid {me}" in msg4, msg4
        assert release(path, pid=me)[0]
        acquire(path, pid=me, host="other-host")
        assert status(path).startswith("REMOTE") and not release(path, pid=me)[0]
        assert release(path, force=True)[0]
        path.write_text("{")
        assert not acquire(path, pid=me)[0] and not release(path, pid=me)[0]
        assert status(path) == INVALID_LOCK
        assert release(path, force=True)[0]
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
        # Slow the read inside each contender so that an unprotected read/modify/write
        # would let several processes see the same empty or stale snapshot.
        race_code = f"""
import pathlib, sys, time
sys.path.insert(0, {str(ROOT / 'tools')!r})
import round_lock
read = round_lock.read_lock
def slow_read(path):
    owner = read(path)
    time.sleep(0.04)
    return owner
round_lock.read_lock = slow_read
input()
print(round_lock.acquire(pathlib.Path({str(path)!r}))[1])
"""
        for stale in (False, True):
            if stale:
                acquire(path, pid=999999)
            children = [subprocess.Popen(
                [sys.executable, "-c", race_code],
                stdin=subprocess.PIPE, stdout=subprocess.PIPE, text=True,
            ) for _ in range(8)]
            for child in children:
                child.stdin.write("\n")
                child.stdin.flush()
            results = [child.communicate(timeout=10)[0] for child in children]
            assert all(child.returncode == 0 for child in children)
            assert sum(msg.startswith("locked by pid") for msg in results) == 1, results
            assert release(path, pid=me)[0]
        # --force 可清除殘留或不同 pid 的鎖
        acquire(path, pid=999999, host=socket.gethostname(), note="stale-force")
        ok8, msg8 = release(path, pid=me, force=True)
        assert ok8 and msg8 == "released", msg8
    print("PASS: round lock (one winner in concurrent acquisition and takeover, remote and invalid owners protected, parent pid tracked across CLI calls).")


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
