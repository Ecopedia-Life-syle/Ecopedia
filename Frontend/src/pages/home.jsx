import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Car,
  Utensils,
  Zap,
  TrendingDown,
  Award,
  Leaf,
  Target,
} from "lucide-react";

const COLORS = ["#ef4444", "#f59e0b", "#10b981"];

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

export default function CarbonTracker() {
  const [view, setView] = useState("dashboard");
  const [activities, setActivities] = useState([]);
  const [transportType, setTransportType] = useState("motor");
  const [transportKm, setTransportKm] = useState("");
  const [foodType, setFoodType] = useState("daging_ayam");
  const [foodPortions, setFoodPortions] = useState("");
  const [acHours, setAcHours] = useState("");
  const [tvHours, setTvHours] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("carbonData");
    if (saved) {
      setActivities(JSON.parse(saved));
    }
  }, []);

  const saveActivity = (newActivity) => {
    const updated = [newActivity, ...activities];
    setActivities(updated);
    localStorage.setItem("carbonData", JSON.stringify(updated));
  };

  const getTodayTotal = () => {
    const today = new Date().toISOString().split("T")[0];
    return activities
      .filter((a) => a.date === today)
      .reduce((sum, a) => sum + a.emission, 0);
  };

  const getWeekData = () => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      const dayTotal = activities
        .filter((a) => a.date === dateStr)
        .reduce((sum, a) => sum + a.emission, 0);
      data.push({
        date: dateStr.slice(5),
        value: parseFloat(dayTotal.toFixed(1)),
      });
    }
    return data;
  };

  const getCategoryData = () => {
    const today = new Date().toISOString().split("T")[0];
    const todayActivities = activities.filter((a) => a.date === today);
    const categories = { transport: 0, food: 0, energy: 0 };
    todayActivities.forEach((a) => {
      categories[a.type] = (categories[a.type] || 0) + a.emission;
    });
    return Object.entries(categories)
      .filter(([_, value]) => value > 0)
      .map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value: parseFloat(value.toFixed(2)),
      }));
  };

  const handleTransport = () => {
    const km = parseFloat(transportKm);
    if (km > 0) {
      const emission = km * EMISSION_FACTORS[transportType];
      saveActivity({
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        type: "transport",
        name: transportType,
        emission: parseFloat(emission.toFixed(2)),
      });
      setTransportKm("");
    }
  };

  const handleFood = () => {
    const portions = parseFloat(foodPortions);
    if (portions > 0) {
      const emission = portions * EMISSION_FACTORS[foodType];
      saveActivity({
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        type: "food",
        name: foodType,
        emission: parseFloat(emission.toFixed(2)),
      });
      setFoodPortions("");
    }
  };

  const handleEnergy = () => {
    const ac = parseFloat(acHours) || 0;
    const tv = parseFloat(tvHours) || 0;
    if (ac > 0 || tv > 0) {
      const emission =
        ac * EMISSION_FACTORS.ac_per_hour + tv * EMISSION_FACTORS.tv_per_hour;
      saveActivity({
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        type: "energy",
        name: "daily",
        emission: parseFloat(emission.toFixed(2)),
      });
      setAcHours("");
      setTvHours("");
    }
  };

  const todayTotal = getTodayTotal();
  const weekData = getWeekData();
  const categoryData = getCategoryData();
  const weekTotal = weekData.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Leaf className="w-10 h-10" />
            <div>
              <h1 className="text-3xl font-bold">EcoTrack</h1>
              <p className="text-sm text-emerald-100">
                Carbon Footprint Tracker
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{todayTotal.toFixed(1)}</div>
            <div className="text-sm">kg CO₂ hari ini</div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 flex gap-6">
          {["dashboard", "input", "insights", "achievements"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`py-4 px-2 border-b-2 font-medium ${
                view === v
                  ? "border-emerald-600 text-emerald-600"
                  : "border-transparent text-gray-500"
              }`}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {view === "dashboard" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow p-6">
                <Target className="w-10 h-10 text-emerald-500 mb-2" />
                <p className="text-sm text-gray-600">Hari Ini</p>
                <p className="text-3xl font-bold">{todayTotal.toFixed(1)}</p>
                <p className="text-xs text-gray-500">kg CO₂</p>
              </div>
              <div className="bg-white rounded-xl shadow p-6">
                <TrendingDown className="w-10 h-10 text-blue-500 mb-2" />
                <p className="text-sm text-gray-600">Minggu Ini</p>
                <p className="text-3xl font-bold">{weekTotal.toFixed(1)}</p>
                <p className="text-xs text-gray-500">kg CO₂</p>
              </div>
              <div className="bg-white rounded-xl shadow p-6">
                <Leaf className="w-10 h-10 text-teal-500 mb-2" />
                <p className="text-sm text-gray-600">Pohon Dibutuhkan</p>
                <p className="text-3xl font-bold">
                  {Math.ceil(todayTotal / 0.5)}
                </p>
                <p className="text-xs text-gray-500">untuk netralkan</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="font-semibold mb-4">Trend 7 Hari</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={weekData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" style={{ fontSize: 12 }} />
                    <YAxis style={{ fontSize: 12 }} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#10b981"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="font-semibold mb-4">Kategori Hari Ini</h3>
                {categoryData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={index} fill={COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Belum ada data hari ini
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-semibold mb-4">Aktivitas Terbaru</h3>
              {activities.slice(0, 5).map((a) => (
                <div
                  key={a.id}
                  className="flex justify-between p-3 bg-gray-50 rounded-lg mb-2"
                >
                  <div className="flex items-center gap-3">
                    {a.type === "transport" && (
                      <Car className="w-5 h-5 text-red-500" />
                    )}
                    {a.type === "food" && (
                      <Utensils className="w-5 h-5 text-orange-500" />
                    )}
                    {a.type === "energy" && (
                      <Zap className="w-5 h-5 text-blue-500" />
                    )}
                    <div>
                      <p className="font-medium text-sm">
                        {a.name.replace("_", " ").toUpperCase()}
                      </p>
                      <p className="text-xs text-gray-500">{a.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-600">{a.emission}</p>
                    <p className="text-xs text-gray-500">kg CO₂</p>
                  </div>
                </div>
              ))}
              {activities.length === 0 && (
                <p className="text-center text-gray-400 py-8">
                  Mulai tracking aktivitas Anda!
                </p>
              )}
            </div>
          </div>
        )}

        {view === "input" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center gap-2 mb-4">
                <Car className="w-6 h-6 text-red-500" />
                <h3 className="text-xl font-semibold">Transportasi</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Jenis Kendaraan
                  </label>
                  <select
                    value={transportType}
                    onChange={(e) => setTransportType(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="motor">Motor</option>
                    <option value="mobil">Mobil</option>
                    <option value="busway">Busway</option>
                    <option value="kereta">Kereta</option>
                    <option value="sepeda">Sepeda</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Jarak (km)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={transportKm}
                    onChange={(e) => setTransportKm(e.target.value)}
                    placeholder="10"
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <button
                  onClick={handleTransport}
                  className="w-full bg-emerald-600 text-white p-3 rounded-lg font-semibold hover:bg-emerald-700"
                >
                  + Tambah Transportasi
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center gap-2 mb-4">
                <Utensils className="w-6 h-6 text-orange-500" />
                <h3 className="text-xl font-semibold">Makanan</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Jenis Makanan
                  </label>
                  <select
                    value={foodType}
                    onChange={(e) => setFoodType(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="daging_sapi">Daging Sapi</option>
                    <option value="daging_ayam">Daging Ayam</option>
                    <option value="ikan">Ikan</option>
                    <option value="vegetarian">Vegetarian</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Porsi
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={foodPortions}
                    onChange={(e) => setFoodPortions(e.target.value)}
                    placeholder="1"
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <button
                  onClick={handleFood}
                  className="w-full bg-orange-600 text-white p-3 rounded-lg font-semibold hover:bg-orange-700"
                >
                  + Tambah Makanan
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-6 h-6 text-blue-500" />
                <h3 className="text-xl font-semibold">Energi</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    AC (jam/hari)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={acHours}
                    onChange={(e) => setAcHours(e.target.value)}
                    placeholder="8"
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    TV/Komputer (jam/hari)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={tvHours}
                    onChange={(e) => setTvHours(e.target.value)}
                    placeholder="4"
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <button
                  onClick={handleEnergy}
                  className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                  + Tambah Energi
                </button>
              </div>
            </div>
          </div>
        )}

        {view === "insights" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-semibold mb-4">
                💡 Tips Pengurangan Emisi
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
                  <div className="text-4xl">🚲</div>
                  <div>
                    <p className="font-medium">
                      Gunakan transportasi umum atau sepeda
                    </p>
                    <p className="text-sm text-emerald-600 mt-1">
                      Hemat ~3kg CO₂/hari
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
                  <div className="text-4xl">🥗</div>
                  <div>
                    <p className="font-medium">Kurangi konsumsi daging merah</p>
                    <p className="text-sm text-emerald-600 mt-1">
                      Hemat ~5kg CO₂/hari
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
                  <div className="text-4xl">❄️</div>
                  <div>
                    <p className="font-medium">
                      Set AC di 25°C, matikan saat keluar
                    </p>
                    <p className="text-sm text-emerald-600 mt-1">
                      Hemat ~2kg CO₂/hari
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Target vs Aktual</h3>
              <div className="flex justify-between text-sm mb-2">
                <span>Emisi Hari Ini</span>
                <span className="font-semibold">
                  {todayTotal.toFixed(1)} / 5.5 kg CO₂
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${
                    todayTotal <= 5.5 ? "bg-emerald-500" : "bg-red-500"
                  }`}
                  style={{
                    width: `${Math.min((todayTotal / 5.5) * 100, 100)}%`,
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                Target: 5.5 kg CO₂/hari (rata-rata Indonesia)
              </p>
            </div>

            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl shadow p-6">
              <h3 className="text-xl font-semibold mb-3">💡 Tahukah Kamu?</h3>
              <ul className="space-y-2 text-sm">
                <li>• 1 kg daging sapi menghasilkan 27 kg CO₂</li>
                <li>• Sepeda vs motor 10km = hemat 1.5 kg CO₂</li>
                <li>• AC 25°C vs 22°C = hemat 20% energi</li>
                <li>• 1 pohon dewasa menyerap 22 kg CO₂/tahun</li>
              </ul>
            </div>
          </div>
        )}

        {view === "achievements" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Award className="w-6 h-6 text-yellow-500" />
                Badge & Pencapaian
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div
                  className={`p-6 rounded-xl text-center ${
                    activities.length > 0
                      ? "bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-400"
                      : "bg-gray-100 opacity-50"
                  }`}
                >
                  <div className="text-5xl mb-2">🌱</div>
                  <p className="font-semibold text-sm">Eco Starter</p>
                  <p className="text-xs text-gray-600 mt-1">Mulai tracking</p>
                  {activities.length > 0 && (
                    <div className="mt-2 text-emerald-600 text-xs font-semibold">
                      ✓ UNLOCKED
                    </div>
                  )}
                </div>
                <div
                  className={`p-6 rounded-xl text-center ${
                    activities.length >= 7
                      ? "bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-400"
                      : "bg-gray-100 opacity-50"
                  }`}
                >
                  <div className="text-5xl mb-2">⚡</div>
                  <p className="font-semibold text-sm">Week Warrior</p>
                  <p className="text-xs text-gray-600 mt-1">7 hari tracking</p>
                  {activities.length >= 7 && (
                    <div className="mt-2 text-emerald-600 text-xs font-semibold">
                      ✓ UNLOCKED
                    </div>
                  )}
                </div>
                <div
                  className={`p-6 rounded-xl text-center ${
                    todayTotal < 5.5 && todayTotal > 0
                      ? "bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-400"
                      : "bg-gray-100 opacity-50"
                  }`}
                >
                  <div className="text-5xl mb-2">💚</div>
                  <p className="font-semibold text-sm">Low Carbon</p>
                  <p className="text-xs text-gray-600 mt-1">Di bawah target</p>
                  {todayTotal < 5.5 && todayTotal > 0 && (
                    <div className="mt-2 text-emerald-600 text-xs font-semibold">
                      ✓ UNLOCKED
                    </div>
                  )}
                </div>
                <div className="p-6 rounded-xl text-center bg-gray-100 opacity-50">
                  <div className="text-5xl mb-2">🏆</div>
                  <p className="font-semibold text-sm">Eco Hero</p>
                  <p className="text-xs text-gray-600 mt-1">
                    30 hari konsisten
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Statistik Kamu</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-6 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl">
                  <p className="text-4xl font-bold text-emerald-600">
                    {activities.length}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Total Aktivitas Tracked
                  </p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl">
                  <p className="text-4xl font-bold text-blue-600">
                    {weekTotal.toFixed(0)}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    kg CO₂ Minggu Ini
                  </p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
                  <p className="text-4xl font-bold text-purple-600">
                    {Math.ceil(weekTotal / 0.5)}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">Pohon Dibutuhkan</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl shadow p-6">
              <h3 className="text-2xl font-bold mb-3">🎯 Keep Going!</h3>
              <p className="text-emerald-100">
                Setiap langkah kecil membuat perbedaan besar untuk planet kita.
                Terus tracking dan kurangi jejak karbonmu!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
