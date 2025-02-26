const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes'); // Import authentication routes

const app = express();
const PORT = 5000;

// Middleware setup
app.use(cors({ origin: 'http://127.0.0.1:5500', credentials: true })); // Allow frontend requests from 127.0.0.1:5500
app.use(bodyParser.json()); // Parse JSON requests
app.use(session({
    secret: 'your-secret-key', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set true if using HTTPS
}));

// Use authentication routes
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send("Backend is running...");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});