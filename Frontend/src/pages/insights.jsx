import React from "react";

export default function Insights() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">💡 Insights & Tips</h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <div className="flex gap-4 items-center bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg">
          <span className="text-4xl">🚲</span>
          <div>
            <p className="font-medium">Gunakan transportasi umum atau sepeda</p>
            <p className="text-sm text-emerald-600 mt-1">Hemat ~3kg CO₂/hari</p>
          </div>
        </div>

        <div className="flex gap-4 items-center bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg">
          <span className="text-4xl">🥗</span>
          <div>
            <p className="font-medium">Kurangi konsumsi daging merah</p>
            <p className="text-sm text-emerald-600 mt-1">Hemat ~5kg CO₂/hari</p>
          </div>
        </div>

        <div className="flex gap-4 items-center bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg">
          <span className="text-4xl">❄️</span>
          <div>
            <p className="font-medium">Set AC di 25°C, matikan saat keluar</p>
            <p className="text-sm text-emerald-600 mt-1">Hemat ~2kg CO₂/hari</p>
          </div>
        </div>
      </div>
    </div>
  );
}
