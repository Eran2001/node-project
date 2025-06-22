import { Router } from "express";
import pool from "../db/db.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

// get all users
router.get("/users", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.render("users", { users: rows });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get a user by ID
router.get("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// create a user
router.post("/users", async (req, res) => {
  const { name, age, password, status } = req.body;
  if (!name || !age || !password || !status) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const result = await pool.query(
      "INSERT INTO users (name, age, password, status) VALUES (?, ?, ?, ?)",
      [name, age, password, status]
    );
    res
      .status(201)
      .json({ message: "User added successfully", userId: result[0].insertId });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
