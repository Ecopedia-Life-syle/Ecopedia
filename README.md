# 🌿 Ecopedia

**Ecopedia** adalah aplikasi ramah lingkungan yang membantu pengguna menghitung **jejak karbon (carbon footprint)** dari aktivitas sehari-hari seperti **transportasi**, **konsumsi makanan**, dan **penggunaan energi**.  
Tujuannya adalah untuk meningkatkan kesadaran akan dampak karbon individu dan memberikan rekomendasi agar pengguna bisa beralih ke gaya hidup yang lebih hijau 🌱.

---

## 🚀 Fitur Utama

1. **Kalkulasi Karbon Transportasi**  
   Hitung emisi karbon berdasarkan moda transportasi (mobil, motor, transportasi umum, sepeda, dll) dan jarak tempuh.

2. **Kalkulasi Karbon Makanan**  
   Menghitung emisi karbon dari pola makan pengguna, seperti konsumsi daging, sayur, atau makanan olahan.

3. **Kalkulasi Karbon Energi**  
   Mengukur jejak karbon berdasarkan penggunaan listrik, gas, dan energi rumah tangga lainnya.

4. **Autentikasi Pengguna**  
   Login dan registrasi menggunakan JWT untuk keamanan.

5. **Analisis Gambar dengan AI (opsional)**  
   Menggunakan **Gemini API** untuk menganalisis gambar dan memberikan insight terkait lingkungan atau keberlanjutan.

---

## 🧠 Teknologi yang Digunakan

### Backend
- **Node.js** dengan **Express.js**
- **Prisma ORM** (terhubung ke database)
- **JWT Authentication**
- **Multer** (untuk upload file)
- **dotenv** (pengaturan environment)
- **bcryptjs** (enkripsi password)

### Frontend
- **React.js** untuk tampilan antarmuka pengguna (UI)
- **Axios** untuk komunikasi dengan backend API

---

## 📦 Instalasi & Konfigurasi

### 1️⃣ Clone Repository
```bash
git clone https://github.com/username/ecopedia.git
cd ecopedia
