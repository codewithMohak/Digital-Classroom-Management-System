const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const redisClient = require("./config/redis");
const studentRoutes = require("./routes/StudentRoutes");
// const classroomRoutes = require("./routes/classroomRoutes");
const cors = require("cors");

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/students", studentRoutes);
// app.use("/api/classroom", classroomRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
