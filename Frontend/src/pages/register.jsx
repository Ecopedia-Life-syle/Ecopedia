import React, { useState } from "react";
import { useApp } from "../context/appcontext";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const { users, setUsers } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!email || !password) {
      setError("Email dan password harus diisi!");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password tidak sama!");
      return;
    }
    if (users.find((u) => u.email === email)) {
      setError("Email sudah terdaftar!");
      return;
    }

    const newUser = { email, password };
    setUsers([...users, newUser]);
    alert("Registrasi berhasil! Silakan login.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Daftar EcoTrack</h2>
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
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Konfirmasi Password"
          className="w-full p-3 border rounded-lg mb-4"
        />
        <button
          onClick={handleRegister}
          className="w-full bg-emerald-600 text-white p-3 rounded-lg font-semibold hover:bg-emerald-700 mb-4"
        >
          Daftar
        </button>
        <p className="text-sm text-center text-gray-600">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-emerald-600 font-semibold">
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
