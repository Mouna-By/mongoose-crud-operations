// 1 - Require express
const express = require("express");

// 2 - Create instance
const app = express();

// 3 - Load .env
require("dotenv").config();

// 4 - Connect to MongoDB
const connectDB = require("./config/connectDB");
connectDB();

// 5 - Create a port
const PORT = process.env.PORT;

// 6 - Start server
app.listen(PORT, (error) => {
    if (error) console.error(error);
    else console.log(`Server is running on port ${PORT}`);
});
