import React, { useState } from "react";
import { useApp } from "../context/appcontext";

const EMISSION_FACTORS = {
  motor: 0.15,
  mobil: 0.25,
  busway: 0.05,
  kereta: 0.04,
  sepeda: 0,
  daging_sapi: 27,
  daging_ayam: 6.9,
  ikan: 5.1,
  vegetarian: 2.0,
  ac_per_hour: 0.9,
  tv_per_hour: 0.1,
};

export default function Input() {
  const { activities, setActivities } = useApp();
  const [transportType, setTransportType] = useState("motor");
  const [transportKm, setTransportKm] = useState("");
  const [foodType, setFoodType] = useState("daging_ayam");
  const [foodPortions, setFoodPortions] = useState("");
  const [acHours, setAcHours] = useState("");
  const [tvHours, setTvHours] = useState("");

  const saveActivity = (newActivity) => {
    setActivities([newActivity, ...activities]);
  };

  const handleTransport = () => {
    const km = parseFloat(transportKm);
    if (km > 0) {
      saveActivity({
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        type: "transport",
        name: transportType,
        emission: parseFloat((km * EMISSION_FACTORS[transportType]).toFixed(2)),
      });
      setTransportKm("");
    }
  };

  const handleFood = () => {
    const portions = parseFloat(foodPortions);
    if (portions > 0) {
      saveActivity({
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        type: "food",
        name: foodType,
        emission: parseFloat((portions * EMISSION_FACTORS[foodType]).toFixed(2)),
      });
      setFoodPortions("");
    }
  };

  const handleEnergy = () => {
    const ac = parseFloat(acHours) || 0;
    const tv = parseFloat(tvHours) || 0;
    if (ac > 0 || tv > 0) {
      saveActivity({
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        type: "energy",
        name: "daily",
        emission: parseFloat((ac * EMISSION_FACTORS.ac_per_hour + tv * EMISSION_FACTORS.tv_per_hour).toFixed(2)),
      });
      setAcHours("");
      setTvHours("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Input Aktivitas</h1>

      {/* Transport */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="font-semibold text-xl mb-2">🚗 Transportasi</h2>
        <select value={transportType} onChange={e => setTransportType(e.target.value)} className="w-full p-3 border rounded-lg">
          <option value="motor">Motor</option>
          <option value="mobil">Mobil</option>
          <option value="busway">Busway</option>
          <option value="kereta">Kereta</option>
          <option value="sepeda">Sepeda</option>
        </select>
        <input type="number" value={transportKm} onChange={e => setTransportKm(e.target.value)} placeholder="Jarak (km)" className="w-full p-3 border rounded-lg" />
        <button onClick={handleTransport} className="w-full bg-emerald-600 text-white p-3 rounded-lg font-semibold hover:bg-emerald-700">
          + Tambah Transportasi
        </button>
      </div>

      {/* Food */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="font-semibold text-xl mb-2">🍽️ Makanan</h2>
        <select value={foodType} onChange={e => setFoodType(e.target.value)} className="w-full p-3 border rounded-lg">
          <option value="daging_sapi">Daging Sapi</option>
          <option value="daging_ayam">Daging Ayam</option>
          <option value="ikan">Ikan</option>
          <option value="vegetarian">Vegetarian</option>
        </select>
        <input type="number" value={foodPortions} onChange={e => setFoodPortions(e.target.value)} placeholder="Porsi" className="w-full p-3 border rounded-lg" />
        <button onClick={handleFood} className="w-full bg-orange-600 text-white p-3 rounded-lg font-semibold hover:bg-orange-700">
          + Tambah Makanans
        </button>
      </div>

      {/* Energy */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="font-semibold text-xl mb-2">⚡ Energi</h2>
        <input type="number" value={acHours} onChange={e => setAcHours(e.target.value)} placeholder="AC (jam/hari)" className="w-full p-3 border rounded-lg" />
        <input type="number" value={tvHours} onChange={e => setTvHours(e.target.value)} placeholder="TV/Komputer (jam/hari)" className="w-full p-3 border rounded-lg" />
        <button onClick={handleEnergy} className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700">
          + Tambah Energi
        </button>
      </div>
    </div>
  );
}
