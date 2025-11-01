import React, { useState } from "react";
import { useApp } from "../context/appcontext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { users, setCurrentUser } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      setError("");
      navigate("/dashboard");
    } else {
      setError("Email atau password salah!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login ke EcoTrack
        </h2>
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com"
          className="w-full p-3 border rounded-lg mb-4"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          className="w-full p-3 border rounded-lg mb-4"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-emerald-600 text-white p-3 rounded-lg font-semibold hover:bg-emerald-700 mb-4"
        >
          Login
        </button>
        <p className="text-sm text-center text-gray-600">
          Belum punya akun?{" "}
          <Link to="/register" className="text-emerald-600 font-semibold">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
