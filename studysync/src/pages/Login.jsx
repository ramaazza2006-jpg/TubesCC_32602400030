import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, GraduationCap, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Login() {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    setLoading(true);

    try {
      await login(email, password);

      if (remember) {
        localStorage.setItem("remember", "true");
      } else {
        localStorage.removeItem("remember");
      }

      navigate("/");
    } catch (err) {
      const message =
        err?.response?.data?.message || "Email atau Password salah.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (

    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div className="grid lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full">

        {/* Left */}

        <div className="bg-blue-600 text-white p-12 flex flex-col justify-center">

          <div className="flex items-center gap-4 mb-8">

            <div className="bg-white/20 p-4 rounded-2xl">
              <GraduationCap size={42}/>
            </div>

            <div>

              <h1 className="text-4xl font-bold">
                StudySync
              </h1>

              <p className="text-blue-100">
                Smart College Productivity
              </p>

            </div>

          </div>

          <h2 className="text-3xl font-bold">
            Selamat Datang 👋
          </h2>

          <p className="mt-5 text-blue-100 leading-8">

            Kelola jadwal kuliah,
            tugas,
            materi,
            dan catatan
            dalam satu aplikasi.

          </p>

        </div>

        {/* Right */}

        <div className="p-12">

          <h2 className="text-3xl font-bold">
            Login
          </h2>

          <p className="text-slate-500 mb-8 mt-2">
            Masuk ke akun StudySync
          </p>

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            <div>

              <label>Email</label>

              <div className="flex items-center border rounded-xl px-4 mt-2">

                <Mail
                  size={18}
                  className="text-slate-400"
                />

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 outline-none"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  required
                />

              </div>

            </div>

            <div>

              <label>Password</label>

              <div className="flex items-center border rounded-xl px-4 mt-2">

                <Lock
                  size={18}
                  className="text-slate-400"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Password"
                  className="w-full p-3 outline-none"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  onClick={()=>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >

                  {
                    showPassword
                    ? <EyeOff size={18}/>
                    : <Eye size={18}/>
                  }

                </button>

              </div>

            </div>

            <div className="flex justify-between">

              <label className="flex gap-2">

                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e)=>
                    setRemember(e.target.checked)
                  }
                />

                Remember Me

              </label>

            </div>

            <button
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition disabled:opacity-60"
            >
              {loading ? "Memproses..." : "Login"}
            </button>

          </form>

          <p className="text-center mt-8">

            Belum punya akun?

            <Link
              to="/register"
              className="text-blue-600 ml-2"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}
