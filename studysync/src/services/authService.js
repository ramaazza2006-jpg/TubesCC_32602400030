import api from "./api";

export async function login(email, password) {
  const res = await api.post("/auth/login", { email, password });
  return res.data; // { success, token, user }
}

export async function register(name, email, password) {
  const res = await api.post("/auth/register", { name, email, password });
  return res.data; // { success, token, user }
}

export async function me() {
  const res = await api.get("/auth/me");
  return res.data.user;
}

export async function updateProfile(payload) {
  const res = await api.put("/auth/me", payload);
  return res.data.user;
}
