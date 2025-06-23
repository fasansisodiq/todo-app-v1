import { FaShareAlt } from "react-icons/fa";
import TaskOperation from "../../utils/TaskOperation";
import { useState } from "react";
import UniqueAssignees from "../../utils/UniqueAssignees";
import { useOperation } from "../../customHooks/operation/useOperation";

function ShareTaskOperation({ task }) {
  const [show, setShow] = useState(false);
  const [recipient, setRecipient] = useState("");
  const { onOpenShare } = useOperation();
  function handSubmit(e) {
    e.preventDefault();
  }
  return (
    <>
      <TaskOperation
        label={"share"}
        icon={<FaShareAlt />}
        open={show}
        onClick={() => setShow(!show)}
      >
        <div className="w-full max-w-full flex flex-col gap-2 items-center bg-emerald-100 p-2 shadow dark:bg-[#393d44] rounded-lg">
          <form
            onSubmit={handSubmit}
            className="flex w-full max-w-full items-center  bg-emerald-50 dark:bg-[#4f5259] rounded-xl shadow p-1 border border-emerald-100 dark:border-[#4f5259] focus-within:ring-2 focus-within:ring-emerald-400 transition"
            style={{ minWidth: 0 }}
            autoComplete="off"
          >
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Enter username or email"
              className="flex- min-w-0 bg-transparent outline-none text-lg text-slate-800 dark:text-emerald-400 placeholder:text-sm placeholder-slate-400 dark:placeholder-emerald-400"
              maxLength={120}
              aria-label="Task name"
            />
            {recipient.length > 0 && (
              <button
                onClick={onOpenShare}
                className="flex-shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold p-1 py-0.5 text-sm p rounded-lg shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="recipent"
              >
                next
              </button>
            )}
          </form>
          {show && (
            <UniqueAssignees
              useFor="share"
              task={task}
              recipientIdentifier={recipient}
            />
          )}
        </div>
      </TaskOperation>
    </>
  );
}

export default ShareTaskOperation;
