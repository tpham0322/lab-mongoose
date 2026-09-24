const express = require("express");
require("dotenv").config();

const connectDB = require("./db/connection");
const bookRoutes = require("./routes/bookRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use("/api/books", bookRoutes);

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Digital Bookshelf API is running"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});