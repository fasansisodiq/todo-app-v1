const API__URl = "http://localhost:9000";

export async function CreateUser(newUser) {
  try {
    const res = await fetch(`${API__URl}/users`, {
      method: "POST",
      Body: JSON.stringify(newUser),
      headers: {
        Content_Type: "application/json",
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
