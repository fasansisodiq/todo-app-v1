const notificationDatas = [
  { label: "task name", value: "title" },
  { label: "description", value: "description" },
  // { label: "status", value: "priority" },
  { label: "assignee", value: "assignee" },
  { label: "due date", value: "dueDate" },
  { label: "created at", value: "createdAt" },
  { label: "updated at", value: "updatedAt" },
];
function NotificationCard({ notifications, onMarkAsRead }) {
  if (!notifications) return null;
  // Helper to display High/Low for priority
  const getPriorityLabel = (priority) => {
    if (priority === true || priority === "on" || priority === "high")
      return "High";
    return "Low";
  };
  return (
    <div
      className={`p-4 rounded-xl shadow mb-3 flex items-center justify-between transition-colors duration-200
        ${
          notifications.read
            ? "bg-slate-100 dark:bg-[#656b66]"
            : "bg-emerald-50 dark:bg-[#39403b]"
        }`}
    >
      <div>
        <div className="font-semibold text-emerald-700 dark:text-yellow-300">
          {notifications.title}
        </div>
        <div className="text-slate-600 dark:text-yellow-100 text-sm">
          {notifications.message}
        </div>
        <>
          {notifications.taskData && (
            <div className="text-xs mt-2">
              {notificationDatas.map((data) => (
                <div key={data.value} className="dark:text-yellow-200/70">
                  {data.label}:{" "}
                  <span className="font-semibold dark:text-yellow-100">
                    {notifications.taskData[data.value]}
                  </span>
                </div>
              ))}
              <div>
                <span className="font-semibold dark:text-yellow-200/70">
                  Priority:
                </span>{" "}
                <span
                  className={
                    getPriorityLabel(notifications.taskData.priority) === "High"
                      ? "text-red-600 dark:text-red-400 font-bold"
                      : "text-slate-500 dark:text-yellow-400 font-bold"
                  }
                >
                  {getPriorityLabel(notifications.taskData.priority)}
                </span>
              </div>
            </div>
          )}
        </>
        <div className="text-xs text-slate-400 dark:text-yellow-500">
          {new Date(notifications.createdAt).toLocaleString()}
        </div>
      </div>

      {!notifications.read && (
        <button
          className="ml-4 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 dark:bg-emerald-800 dark:hover:bg-emerald-900 dark:text-yellow-200 transition-colors duration-200"
          onClick={() => onMarkAsRead(notifications.id)}
        >
          Mark as read
        </button>
      )}
    </div>
  );
}
export default NotificationCard;
