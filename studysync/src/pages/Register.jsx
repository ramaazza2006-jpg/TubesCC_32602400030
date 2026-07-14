import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Register() {

  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {

    e.preventDefault();

    if (!name || !email || !password || !confirm) {
      toast.error("Lengkapi semua data.");
      return;
    }

    if (password !== confirm) {
      toast.error("Konfirmasi password tidak sama.");
      return;
    }

    setLoading(true);

    try {
      await register(name, email, password);
      toast.success("Registrasi berhasil.");
      navigate("/");
    } catch (err) {
      const message =
        err?.response?.data?.message || "Registrasi gagal.";
      toast.error(message);
    } finally {
      setLoading(false);
    }

  }

  return (

    <div className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md">

        <h1 className="text-3xl font-bold mb-8">
          Register
        </h1>

        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >

          <div className="flex items-center border rounded-xl px-3">

            <User size={18} />

            <input
              className="w-full p-3 outline-none"
              placeholder="Nama"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />

          </div>

          <div className="flex items-center border rounded-xl px-3">

            <Mail size={18} />

            <input
              type="email"
              className="w-full p-3 outline-none"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />

          </div>

          <div className="flex items-center border rounded-xl px-3">

            <Lock size={18} />

            <input
              type="password"
              className="w-full p-3 outline-none"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

          </div>

          <div className="flex items-center border rounded-xl px-3">

            <Lock size={18} />

            <input
              type="password"
              className="w-full p-3 outline-none"
              placeholder="Konfirmasi Password"
              value={confirm}
              onChange={(e)=>setConfirm(e.target.value)}
            />

          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl disabled:opacity-60"
          >
            {loading ? "Memproses..." : "Register"}
          </button>

        </form>

        <p className="text-center mt-6">

          Sudah punya akun?

          <Link
            to="/login"
            className="text-blue-600 ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}
