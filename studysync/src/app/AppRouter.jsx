import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./AppLayout";
import ProtectedRoute from "../components/auth/ProtectedRoute";

import Dashboard from "../pages/Dashboard";
import Courses from "../pages/Courses";
import Schedule from "../pages/Schedule";
import Tasks from "../pages/Tasks";
import Notes from "../pages/Notes";
import NoteEditor from "../pages/NoteEditor";
import Materials from "../pages/Materials";
import Profile from "../pages/Profile";

import Login from "../pages/Login";
import Register from "../pages/Register";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />

          <Route path="/courses" element={<Courses />} />

          <Route path="/schedule" element={<Schedule />} />

          <Route path="/tasks" element={<Tasks />} />

          <Route path="/notes" element={<Notes />} />

          <Route path="/notes/:id" element={<NoteEditor />} />

          <Route path="/materials" element={<Materials />} />

          <Route path="/profile" element={<Profile />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}