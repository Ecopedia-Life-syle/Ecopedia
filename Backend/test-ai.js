// test-ai.js
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const API_URL = 'http://localhost:5000/api';
let authToken = '';

// 1. Register/Login first
async function login() {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: 'test@example.com',
      password: 'password123'
    });
    authToken = response.data.token;
    console.log('✅ Login successful');
    return authToken;
  } catch (error) {
    console.error('❌ Login failed:', error.response?.data || error.message);
  }
}

// 2. Test AI Analysis
async function testAnalyze(imagePath) {
  try {
    const form = new FormData();
    form.append('image', fs.createReadStream(imagePath));

    const response = await axios.post(`${API_URL}/ai/analyze`, form, {
      headers: {
        ...form.getHeaders(),
        'Authorization': `Bearer ${authToken}`
      }
    });

    console.log('✅ Analysis successful:');
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;

  } catch (error) {
    console.error('❌ Analysis failed:', error.response?.data || error.message);
  }
}

// 3. Get analyses history
async function getAnalyses() {
  try {
    const response = await axios.get(`${API_URL}/ai/analyses`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    console.log('✅ Analyses retrieved:');
    console.log(JSON.stringify(response.data, null, 2));

  } catch (error) {
    console.error('❌ Get analyses failed:', error.response?.data || error.message);
  }
}

// Run tests
async function runTests() {
  await login();
  
  // Replace with your test image path
  await testAnalyze('./test-images/bottle.jpg');
  
  await getAnalyses();
}

runTests();