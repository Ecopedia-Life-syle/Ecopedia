import React from "react";
import { useApp } from "../context/appcontext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { activities, currentUser } = useApp();

  const getTodayTotal = () => {
    const today = new Date().toISOString().split("T")[0];
    return activities
      .filter(a => a.date === today)
      .reduce((sum, a) => sum + a.emission, 0);
  };

  const todayTotal = getTodayTotal();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-6">
      <h1 className="text-3xl font-bold mb-6">🌿 Dashboard EcoTrack</h1>
      <p className="mb-4">Selamat datang, {currentUser.email}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold">Hari Ini</h2>
          <p className="text-2xl font-bold">{todayTotal.toFixed(1)} kg CO₂</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold">Input Aktivitas</h2>
          <Link to="/input" className="text-emerald-600 font-semibold hover:underline">
            Masuk ke Input
          </Link>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold">Insights & Achievements</h2>
          <Link to="/insights" className="text-emerald-600 font-semibold hover:underline mr-4">
            Insights
          </Link>
          <Link to="/achievements" className="text-emerald-600 font-semibold hover:underline">
            Achievements
          </Link>
        </div>
      </div>
    </div>
  );
}
