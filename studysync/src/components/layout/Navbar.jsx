import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 h-20 bg-white border-b flex items-center justify-between px-8">

      <div>

        <h2 className="text-2xl font-bold">
          Welcome Back 👋
        </h2>

        <p className="text-sm text-slate-500">
          Kelola aktivitas kuliahmu hari ini.
        </p>

      </div>

      <div className="flex items-center gap-4">

        <button className="p-2 rounded-xl hover:bg-slate-100 transition">
          <Search />
        </button>

        <button className="p-2 rounded-xl hover:bg-slate-100 transition">
          <Bell />
        </button>

        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />

      </div>

    </header>
  );
}