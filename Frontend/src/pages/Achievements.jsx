import React from "react";
import { useApp } from "../context/appcontext";

export default function Achievements() {
  const { activities } = useApp();
  const todayTotal = activities.filter(a => a.date === new Date().toISOString().split("T")[0])
    .reduce((sum, a) => sum + a.emission, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">🏆 Achievements</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`p-6 rounded-xl text-center ${activities.length > 0 ? "bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-400" : "bg-gray-100 opacity-50"}`}>
          <div className="text-5xl mb-2">🌱</div>
          <p className="font-semibold text-sm">Eco Starter</p>
          {activities.length > 0 && <div className="mt-2 text-emerald-600 text-xs font-semibold">✓ UNLOCKED</div>}
        </div>

        <div className={`p-6 rounded-xl text-center ${activities.length >= 7 ? "bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-400" : "bg-gray-100 opacity-50"}`}>
          <div className="text-5xl mb-2">⚡</div>
          <p className="font-semibold text-sm">Week Warrior</p>
          {activities.length >= 7 && <div className="mt-2 text-emerald-600 text-xs font-semibold">✓ UNLOCKED</div>}
        </div>

        <div className={`p-6 rounded-xl text-center ${todayTotal < 5.5 && todayTotal > 0 ? "bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-400" : "bg-gray-100 opacity-50"}`}>
          <div className="text-5xl mb-2">💚</div>
          <p className="font-semibold text-sm">Low Carbon</p>
          {todayTotal < 5.5 && todayTotal > 0 && <div className="mt-2 text-emerald-600 text-xs font-semibold">✓ UNLOCKED</div>}
        </div>
      </div>
    </div>
  );
}
