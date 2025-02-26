const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes'); // Authentication routes
const productRoutes = require('./routes/productRoutes'); // Product routes (REMOVE if not needed)

const app = express();
const PORT = 5000;

// Middleware setup
app.use(cors({ origin: 'http://127.0.0.1:5500', credentials: true })); // Allow frontend requests
app.use(bodyParser.json()); // Parse JSON requests
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set true if using HTTPS
}));

// **👇 Authentication Logic (Keep this for login/signup)**
app.use('/auth', authRoutes);

// **👇 Product Logic (REMOVE if products are not needed)**
app.use('/api/products', productRoutes); 

// **👇 Home Page Route (REMOVE if not needed)**
app.get('/', (req, res) => {
    res.send("Backend is running...");
});

// **👇 Error Handling Middleware**
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// **🚀 Start the Server**
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
