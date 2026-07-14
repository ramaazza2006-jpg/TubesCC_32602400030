import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/authService";
import { getToken, setToken, clearToken } from "../utils/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      if (!getToken()) {
        setLoading(false);
        return;
      }
      try {
        const current = await authService.me();
        setUser(current);
      } catch (err) {
        clearToken();
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  async function login(email, password) {
    const { token, user } = await authService.login(email, password);
    setToken(token);
    setUser(user);
    return user;
  }

  async function register(name, email, password) {
    const { token, user } = await authService.register(name, email, password);
    setToken(token);
    setUser(user);
    return user;
  }

  function logout() {
    clearToken();
    setUser(null);
  }

  async function updateProfile(payload) {
    const updated = await authService.updateProfile(payload);
    setUser(updated);
    return updated;
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, updateProfile, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
