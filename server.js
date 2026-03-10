const express = require("express");
const mysql = require("mysql2");

const app = express();

app.use(express.json());
app.use(express.static("front-end"));

/* MySQL connection */
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Root@123",
  database: "cat_database"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL");
});


/* Get all cats */
app.get("/cats", (req, res) => {
  db.query("SELECT name, age, color FROM cats", (err, results) => {
    if (err) {
      res.status(500).json({ error: "Failed to fetch cats" });
      return;
    }

    res.json(results);
  });
});


/* Search cat by name */
app.get("/cats/search/:name", (req, res) => {
  const name = req.params.name;

  db.query(
    "SELECT name, age, color FROM cats WHERE LOWER(name) = LOWER(?)",
    [name],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: "Search failed" });
        return;
      }

      res.json(results);
    }
  );
});


/* Upload cat */
app.post("/cats", (req, res) => {
  const { name, age, color } = req.body;

  db.query(
    "INSERT INTO cats (name, age, color) VALUES (?, ?, ?)",
    [name, age, color],
    (err) => {
      if (err) {
        res.status(500).json({ error: "Insert failed" });
        return;
      }

      res.json({ message: "Cat added successfully!" });
    }
  );
});


/* Delete cat by name */
app.delete("/cats/:name", (req, res) => {
  const name = req.params.name;

  db.query(
    "DELETE FROM cats WHERE LOWER(name) = LOWER(?)",
    [name],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Delete failed" });
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Cat not found" });
        return;
      }

      res.json({ message: "Cat deleted successfully!" });
    }
  );
});


app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});