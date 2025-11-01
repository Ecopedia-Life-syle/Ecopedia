const bcrypt = require("bcrypt");
const authService = require("../service/authService");
const tokenUtils = require("../utils/jwt");

async function login(req, res) {
    try {
        const { email, password } = req.body;
        
        const user = await authService.findUser(email);  
        const accessToken = tokenUtils.generateToken(user);
        

        
        if (password.length < 8) {
        res.status(400).json({ message: "Password harus memiliki minimal 8 karakter" });
         }
        const isPasswordValid = await bcrypt.compare(password, user.password);
         if (!isPasswordValid) {
         return res.status(401).json({ message: "Email atau password salah" });
        }
        if(email !== user.email || password !== user.password || isPasswordValid) {
            return res.status(401).json({ message: "Email atau password salah" });
        }
    return res.status(200).json({
      message: "Login berhasil",
      user: {
        id: user.id,
        email: user.email,
      },
        token: accessToken,
    });
    }
    catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal server error" });
    }   
}


async function register(req, res) { 
    
    try {
        const { email, password, full_name, phone, role } = req.body;
        const existingUser = await authService.findUser(email);
        if (existingUser) {
            return res.status(400).json({ message: "Email sudah terdaftar" });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password harus memiliki minimal 8 karakter" });
        }
        const newUser = await authService.addUser({ email, password, full_name, phone, role });
        return res.status(201).json({
            message: "Registrasi berhasil",
            user: {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    login,
    register
};