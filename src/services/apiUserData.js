const API__URl = "http://localhost:9000";

export async function CreateUser(newUser) {
  try {
    const res = await fetch(`${API__URl}/users`, {
      method: "post",
      Body: JSON.stringify({newUser}),
      headers: {
        'Content-Type': "application/json",
      },
    });
    if (!res.ok) throw Error();
    const { data } = await res.json();
    console.log(data);
    return data;
  } catch {
    throw Error("Account Creation failed");
  }
}

export async function getUser() {
  const res = await fetch(`${API__URl}/users`);

  if (!res.ok) throw Error("Could not login incorrect email or password ");

  const { data } = await res.json();

  return data;
}
export async function createTask(newTask) {
  try {
    const res = await fetch(`${API__URl}/tasks`, {
      method: "POST",
      Body: JSON.stringify({newTask}),
      headers: {
        'Content-Type': "application/json",
      },
    });
    if (!res.ok) throw Error();
    const { task } = await res.json();
    console.log(task);
    return task;
  } catch {
    throw Error("Task Creation failed");
  }
}