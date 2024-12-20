const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
const app = express();

// Configure CORS to allow your frontend app to make requests
// const corsOptions = {
//   origin: 'http://localhost:3000',  // Make sure this matches your frontend URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type'],
// };

// Use CORS middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// API Routes
app.use("/api", authRoutes); // User registration & login routes
app.use("/api", courseRoutes); // Course-related routes
app.use("/api/user", userRoutes);

// MongoDB Connection
mongoose
    .connect(process.env.DB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
