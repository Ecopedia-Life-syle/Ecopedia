// src/service/geminiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function analyzeImage(buffer) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const image = {
      inlineData: {
        data: buffer.toString("base64"),
        mimeType: "image/png",
      },
    };

    const prompt = `Analisis gambar barang bekas ini dan berikan informasi sebagai berikut: 
    -nama : nama barang yang teridentifikasi 
    -kategori barang: (plastik/kertas/logam/kain/elektronik/lainnya) 
    -description: deskripsi kondisi dan jenis barang 
    -rekomendasi daur ulang: 
      -title: Judul ide recycle 
      -material: material 1, material 2, dan seterusnya
      -langkah: langkah 1, langkah 2, langkah 3, dan seterusnya
      -perkiraan waktu : estimasi waktu pengerjaan 
      -tingkat kesulitan: Easy/Medium/Hard


      KETENTUAN: 
      1. Maksisamal 150 kata
1. Berikan 3 ide upcycling dengan tingkat kesulitan berbeda (mudah, sedang, sulit)
2. Tutorial harus 5-7 langkah yang jelas dan mudah diikuti
3. Harga estimasi dalam Rupiah (realistis untuk pasar Indonesia: 20.000 - 300.000)
4. Semua teks HARUS dalam Bahasa Indonesia
5. Material yang dibutuhkan harus mudah didapat di Indonesia
6. jangan berikan hasil yang terlalu panjang `;

    const result = await model.generateContent([prompt, image]);
    return result.response.text();
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw new Error("Gagal menganalisis gambar");
  }
}

// // src/service/recycleService.js
// const { getGeminiModel } = require('../config/gemini');
// const prisma = require('../config/prisma');
// const fs = require('fs').promises;

// class RecycleService {
//   async analyzeImage(imagePath) {
//     try {
//       const model = getGeminiModel();

//       // Baca file gambar
//       const imageData = await fs.readFile(imagePath);
//       const base64Image = imageData.toString('base64');

//       const prompt = `
// Analisis gambar barang bekas ini dan berikan informasi dalam format JSON berikut:
// {
//   "itemName": "nama barang yang teridentifikasi",
//   "category": "kategori barang (plastik/kertas/logam/kain/elektronik/lainnya)",
//   "description": "deskripsi kondisi dan jenis barang",
//   "recycleSuggestions": [
//     {
//       "title": "Judul ide recycle",
//       "difficulty": "Easy/Medium/Hard",
//       "materials": ["material 1", "material 2"],
//       "steps": [
//         "langkah 1",
//         "langkah 2",
//         "langkah 3"
//       ],
//       "estimatedTime": "estimasi waktu pengerjaan",
//       "marketValue": "estimasi harga jual (dalam rupiah)"
//     }
//   ]
// }

// Berikan 2-3 saran recycle yang kreatif dan praktis. Fokus pada produk yang bisa dijual dan memiliki nilai ekonomi.
// `;

//       const result = await model.generateContent([
//         prompt,
//         {
//           inlineData: {
//             data: base64Image,
//             mimeType: 'image/jpeg' // sesuaikan dengan tipe gambar
//           }
//         }
//       ]);

//       const response = await result.response;
//       const text = response.text();

//       // Parse JSON dari response
//       const jsonMatch = text.match(/\{[\s\S]*\}/);
//       if (!jsonMatch) {
//         throw new Error('Failed to parse AI response');
//       }

//       const analysisResult = JSON.parse(jsonMatch[0]);

//       return analysisResult;
//     } catch (error) {
//       console.error('Error analyzing image:', error);
//       throw new Error('Failed to analyze image with AI');
//     }
//   }

//   async saveRecycleItem(data, imageUrl) {
//     try {
//       // Simpan setiap saran recycle sebagai item terpisah
//       const savedItems = [];

//       for (const suggestion of data.recycleSuggestions) {
//         const item = await prisma.recycleItem.create({
//           data: {
//             imageUrl: imageUrl,
//             itemName: data.itemName,
//             category: data.category,
//             description: data.description,
//             tutorial: JSON.stringify({
//               title: suggestion.title,
//               steps: suggestion.steps,
//               estimatedTime: suggestion.estimatedTime,
//               marketValue: suggestion.marketValue
//             }),
//             materials: suggestion.materials,
//             difficulty: suggestion.difficulty
//           }
//         });
//         savedItems.push(item);
//       }

//       return savedItems;
//     } catch (error) {
//       console.error('Error saving recycle item:', error);
//       throw new Error('Failed to save recycle item to database');
//     }
//   }

//   async getAllRecycleItems() {
//     try {
//       return await prisma.recycleItem.findMany({
//         orderBy: {
//           createdAt: 'desc'
//         }
//       });
//     } catch (error) {
//       console.error('Error fetching recycle items:', error);
//       throw new Error('Failed to fetch recycle items');
//     }
//   }

//   async getRecycleItemById(id) {
//     try {
//       const item = await prisma.recycleItem.findUnique({
//         where: { id }
//       });

//       if (!item) {
//         throw new Error('Recycle item not found');
//       }

//       return item;
//     } catch (error) {
//       console.error('Error fetching recycle item:', error);
//       throw error;
//     }
//   }
// }

// module.exports = new RecycleService();
