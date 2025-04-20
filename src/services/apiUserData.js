const API__URL = "http://localhost:7000";

export async function CreateUser(newUser) {
  try {
    const res = await fetch(`${API__URL}/users`, {
      method: "post",
      Body: JSON.stringify({ newUser }),
      headers: {
        "Content-Type": "application/json",
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

export async function getUser(user) {
  const res = await fetch(`${API__URL}/users[${user}]`);

  if (!res.ok) throw Error("Could not login incorrect email or password ");

  const { data } = await res.json();

  return data;
}
