import express from "express";
import apiRouter from "./routes/api.js";
import pool from "./db/db.js";

const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "./views");

// Mount the API router
app.use("/", apiRouter);

// Start the server
async function startServer() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Connected to MySQL database");
    connection.release();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to MySQL:", error.message);
    process.exit(1);
  }
}

startServer();
