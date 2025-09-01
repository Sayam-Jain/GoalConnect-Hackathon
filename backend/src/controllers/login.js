const authService = require('../services/login');

async function login(req, res) {
    try {
        const { email, password } = req.body; 
        const token = await authService.loginUser(email, password);
        res.json({ token: token });
    } catch (err) {
        console.log("Error: ", err.message);
        res.status(401).json({ message: err.message });  // Send the specific error message to the client
    }
}

module.exports = { login };
