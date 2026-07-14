import { useState } from "react";
import {
  User,
  Mail,
  GraduationCap,
  School,
  Phone,
  LogOut,
  Pencil,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";

export default function Profile() {

  const navigate = useNavigate();
  const { user, updateProfile, logout } = useAuth();

  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(user || {});

  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  }

  async function saveProfile() {

    try {
      await updateProfile(form);
      toast.success("Profil berhasil diperbarui.");
      setEdit(false);
    } catch {
      toast.error("Gagal memperbarui profil.");
    }

  }

  function handleLogout() {

    logout();
    navigate("/login");

  }

  if (!user) return null;

  const current = edit ? form : user;

  return (

    <div className="max-w-5xl mx-auto space-y-8">

      <div className="bg-white rounded-3xl shadow border p-8">

        <div className="flex flex-col items-center">

          <img
            src="https://i.pravatar.cc/200"
            className="w-36 h-36 rounded-full object-cover border-4 border-blue-500"
            alt=""
          />

          <h1 className="text-3xl font-bold mt-5">
            {user.name}
          </h1>

          <p className="text-slate-500">
            {user.program}
          </p>

          <p className="text-slate-500">
            {user.university}
          </p>

        </div>

      </div>

      <div className="bg-white rounded-3xl shadow border p-8">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-2xl font-bold">
            Informasi Profil
          </h2>

          {!edit ? (

            <button
              onClick={() => {
                setForm(user);
                setEdit(true);
              }}
              className="bg-blue-600 text-white px-5 py-2 rounded-xl flex gap-2 items-center"
            >

              <Pencil size={18} />

              Edit

            </button>

          ) : (

            <button
              onClick={saveProfile}
              className="bg-green-600 text-white px-5 py-2 rounded-xl"
            >
              Simpan
            </button>

          )}

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <Input
            icon={<User size={18} />}
            label="Nama"
            name="name"
            value={current.name}
            edit={edit}
            onChange={handleChange}
          />

          <Input
            icon={<Mail size={18} />}
            label="Email"
            name="email"
            value={current.email}
            edit={false}
          />

          <Input
            icon={<GraduationCap size={18} />}
            label="NIM"
            name="nim"
            value={current.nim}
            edit={edit}
            onChange={handleChange}
          />

          <Input
            icon={<School size={18} />}
            label="Program Studi"
            name="program"
            value={current.program}
            edit={edit}
            onChange={handleChange}
          />

          <Input
            icon={<GraduationCap size={18} />}
            label="Semester"
            name="semester"
            value={current.semester}
            edit={edit}
            onChange={handleChange}
          />

          <Input
            icon={<Phone size={18} />}
            label="Nomor HP"
            name="phone"
            value={current.phone}
            edit={edit}
            onChange={handleChange}
          />

        </div>

      </div>

      <button
        onClick={handleLogout}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl flex justify-center gap-3 items-center"
      >

        <LogOut />

        Logout

      </button>

    </div>

  );

}

function Input({
  icon,
  label,
  value,
  name,
  edit,
  onChange,
}) {

  return (

    <div>

      <label className="font-semibold">
        {label}
      </label>

      <div className="border rounded-xl mt-2 flex items-center px-4">

        <div className="text-slate-400">

          {icon}

        </div>

        <input
          className="w-full p-3 outline-none bg-transparent"
          value={value || ""}
          name={name}
          onChange={onChange}
          readOnly={!edit}
        />

      </div>

    </div>

  );

}
