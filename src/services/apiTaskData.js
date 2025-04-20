const API__URL = "http://localhost:7000";

export async function getTask(id) {
  const res = await fetch(`${API__URL}/tasks/${id}`);

  if (!res.ok) throw Error("Could not login incorrect email or password ");

  const data = await res.json();
  console.log(data);
  return data;
}
export async function getTasks() {
  try {
    const res = await fetch(`${API__URL}/tasks`);

    if (!res.ok) throw Error("Could not load tasks");

    const data = await res.json();
    return data;
  } catch {
    alert("there was an error loading data....");
  }
}
export async function createTask(newTask) {
  try {
    const res = await fetch(`${API__URL}/tasks`, {
      method: "POST",
      Body: JSON.stringify(newTask),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw Error();
    const data = await res.json();
    console.log(data);
    return data;
  } catch {
    throw Error("Task Creation failed");
  }
}
