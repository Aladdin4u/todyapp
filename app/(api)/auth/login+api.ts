export async function POST(request: Request) {
  const body = await request.json();

  try {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: body.username,
        password: body.password,
        expiresInMins: 30, // optional, defaults to 60
      }),
      credentials: "include", // Include cookies (e.g., accessToken) in the request
    });
    const data = await response.json();

    if (data.message) {
      return Response.json({ message: data.message }, { status: 404 });
    }

    return Response.json(data);
  } catch (error) {
    console.error("login error", error);
    return Response.json({ message: "Failed to login" }, { status: 500 });
  }
}
