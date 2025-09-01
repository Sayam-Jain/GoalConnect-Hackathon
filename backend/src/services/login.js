const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateAccessToken } = require('../utils/jwtUtiles');

async function loginUser(email, password) {
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            console.log("email doesn't exist")
            throw new Error("Email does not exit");
        }
        const isPasswordValid =  await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            console.log("password mismatch")
            throw new Error("Invalid password");
        }
        const token = generateAccessToken(existingUser);
        return token;

    } catch (err) {
        console.log("Authentication error:", err.message);
        throw new Error("Invalid credentials");
    }
}
module.exports = { loginUser };