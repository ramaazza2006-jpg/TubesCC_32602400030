import api from "./api";

const RESOURCE = "/tasks";

export async function list() {
  const res = await api.get(RESOURCE);
  return res.data.data;
}

export async function create(payload) {
  const res = await api.post(RESOURCE, payload);
  return res.data.data;
}

export async function update(id, payload) {
  const res = await api.put(`${RESOURCE}/${id}`, payload);
  return res.data.data;
}

export async function remove(id) {
  await api.delete(`${RESOURCE}/${id}`);
}
