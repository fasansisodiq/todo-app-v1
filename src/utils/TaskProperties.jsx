function TaskProperties({ label, value }) {
  return (
    <div className="flex gap-2 rounded-sm border-1 border-slate-200 ">
      <span className="p-2 bg-amber-600">{label}</span>
      <span className="p-2">{value}</span>
    </div>
  );
}

export default TaskProperties;
