const jsonwebtoken = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_JWT_SECRET = process.env.REFRESH_JWT_TOKEN;



const generateToken = (user) => {
    const token = jsonwebtoken.sign(
        { id: user.id}, // payload
        JWT_SECRET,                      // secret key
        { expiresIn: "1d" }              // token expiration
    );
    return token;
}
    
// const refreshToken = (user) =>{
//     return jsonwebtoken.sign(
//         { id: user.id, role: user.role }, // payload
//         REFRESH_JWT_SECRET,                      // secret key
//         { expiresIn: "7d" }                // token expiration
//     );
// }


module.exports = {
    generateToken
};