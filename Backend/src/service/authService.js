const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");

async function findUser(email) {
    return prisma.user.findUnique({
        where: { email }
    });
}
async function addUser(data) {
    const password = data.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userExists = await findUser(data.email);
    if (userExists) {
        throw new Error("User with this email already exists");
    }
    
    const newUser = await prisma.user.create({
        data: {
            email: data.email,
            password: hashedPassword,
            name: data.name
            
        },
    });



    return newUser; // selalu return user, bukan farmers/buyers
}

module.exports = {
    findUser,
    addUser
};