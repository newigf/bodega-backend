const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "bodega",
  port: Number(process.env.DB_PORT) || 5432,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
});

app.get("/", (req, res) => res.send("API Bodega Online funcionando"));

app.get("/productos", async (req, res) => {
  try {
    const r = await pool.query("SELECT * FROM productos ORDER BY id");
    res.json(r.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/pedidos", async (req, res) => {
  const { cliente, producto_id, cantidad } = req.body;
  try {
    const r = await pool.query(
      "INSERT INTO pedidos (cliente, producto_id, cantidad) VALUES ($1, $2, $3) RETURNING *",
      [cliente, producto_id, cantidad]
    );
    res.status(201).json(r.rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor en puerto " + PORT));
