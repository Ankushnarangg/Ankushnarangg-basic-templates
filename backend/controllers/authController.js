const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path');

// Path to the users data file
const usersFile = path.join(__dirname, '../data.json');

// Load users from JSON file
const loadUsers = () => {
    if (!fs.existsSync(usersFile)) return [];
    return JSON.parse(fs.readFileSync(usersFile));
};

// Save users to JSON file
const saveUsers = (users) => {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

// Signup Controller
exports.signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        let users = loadUsers();

        // Check if user already exists
        if (users.find(user => user.username === username)) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password and save the new user
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({ username, password: hashedPassword });
        saveUsers(users);

        res.json({ message: "Signup successful! You can now log in." });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Login Controller
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        let users = loadUsers();
        const user = users.find(user => user.username === username);

        // Check if user exists and password matches
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Save user session
        req.session.user = user;
        res.json({ message: "Login successful!", user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Logout Controller
exports.logout = (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: "Failed to log out" });
            }
            res.json({ message: "Logged out successfully" });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};