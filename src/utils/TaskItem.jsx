import { useState } from "react";

import ReusableTaskItem from "./ReusableTaskItem";

function TaskItem({ task, idx }) {
  return <ReusableTaskItem task={task} idx={idx} />;
}

export default TaskItem;
