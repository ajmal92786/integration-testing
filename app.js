const express = require("express");
const { connectDB } = require("./db/init");
const bookmarkRoutes = require("./routes/bookmarks");

const app = express();
app.use(express.json());

// Connect to the database
connectDB();

// Routes
app.use("/bookmarks", bookmarkRoutes);

module.exports = app;
