import api from "./api";

export async function list() {
  const res = await api.get("/materials");
  return res.data.data;
}

export async function upload(file, course) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("course", course);

  const res = await api.post("/materials", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data.data;
}

export async function remove(id) {
  await api.delete(`/materials/${id}`);
}

export async function download(id) {

  const res = await api.get(`/materials/${id}/download`);

  return res.data.url;

}