import jwt from "jsonwebtoken";

export const accessValidate = (req, res, next) => {
    const {authorization} = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: "Token tidak ditemukan" });
    }
   
    const token = authorization.split(" ")[1];
    const secret = process.env.JWT_SECRET;
    
    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded; // menyimpan informasi user ke request
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(403).json({ message: "Unauthorized" });
    }
};