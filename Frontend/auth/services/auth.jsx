// Simulasi database pengguna
const USERS_DB = {
  'admin': {
    id: 1,
    username: 'admin',
    password: 'Password123!', // Di dunia nyata, ini harus HASH
  },
};

// Simulasi JWT Token
const generateToken = (user) => {
  return `fake-jwt-token-for-${user.username}`;
};

// Fungsi untuk login
export const login = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = USERS_DB[username];
      if (user && user.password === password) {
        const token = generateToken(user);
        resolve({
          user: { id: user.id, username: user.username },
          token: token,
        });
      } else {
        // Ini adalah autentikasi kesalahan password yang diminta
        reject({ message: 'Username atau password salah.' });
      }
    }, 1000); // Simulasi delay jaringan 1 detik
  });
};

// Fungsi untuk register
export const register = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (USERS_DB[username]) {
        reject({ message: 'Username sudah terdaftar.' });
        return;
      }
      const newUser = {
        id: Date.now(), // ID unik sederhana
        username: username,
        password: password, // Di dunia nyata, HASH password ini!
      };
      USERS_DB[username] = newUser;
      const token = generateToken(newUser);
      resolve({
        user: { id: newUser.id, username: newUser.username },
        token: token,
      });
    }, 1000);
  });
};