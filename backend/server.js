require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { sequelize, connectWithRetry } = require("./config/db");
const { ensureBucket } = require("./config/s3");
require("./models"); // registers associations

const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const taskRoutes = require("./routes/taskRoutes");
const noteRoutes = require("./routes/noteRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const materialRoutes = require("./routes/materialRoutes");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "*",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ success: true, message: "StudySync Backend Running 🚀" });
});

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/materials", materialRoutes);

// Basic error fallback
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Terjadi kesalahan pada server." });
});

const PORT = process.env.PORT || 5000;

async function start() {
  await connectWithRetry();
  await sequelize.sync(); // creates tables in MySQL if they don't exist yet
  await ensureBucket();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();
