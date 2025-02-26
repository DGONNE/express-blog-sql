const express = require("express");
const cors = require("cors");
const db = require("./data/db");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// API

//  GET - Ottenere tutti i post
app.get("/posts", (req, res) => {
  db.query("SELECT * FROM posts", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore nel recupero dei post" });
    }
    res.json(results);
  });
});

//  GET - Ottenere un singolo post
app.get("/posts/:id", (req, res) => {
  const postId = req.params.id;
  db.query("SELECT * FROM posts WHERE id = ?", [postId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore nel recupero del post" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Post non trovato" });
    }
    res.json(results[0]);
  });
});

//  DELETE - Eliminare un post
app.delete("/posts/:id", (req, res) => {
  const postId = req.params.id;
  db.query("DELETE FROM posts WHERE id = ?", [postId], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Errore nell'eliminazione del post" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Post non trovato" });
    }
    res.status(204).send();
  });
});

//  Avvio del server
app.listen(PORT, () => {
  console.log(`🚀 Server avviato su http://localhost:${PORT}`);
});
