const express = require("express");
const connection = require("./data/db"); // Importiamo la connessione al database

const app = express();
const PORT = 3000;

app.use(express.json());

// Milestone 2: API per ottenere tutti i post
app.get("/posts", (req, res) => {
  connection.query("SELECT * FROM posts", (err, results) => {
    if (err) {
      console.error("Errore nel recupero dei post:", err);
      return res.status(500).json({ error: "Errore nel server" });
    }
    res.json(results);
  });
});

// Milestone 3: API per eliminare un post
app.delete("/posts/:id", (req, res) => {
  const postId = req.params.id;
  connection.query(
    "DELETE FROM posts WHERE id = ?",
    [postId],
    (err, result) => {
      if (err) {
        console.error("Errore nell'eliminazione del post:", err);
        return res.status(500).json({ error: "Errore nel server" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Post non trovato" });
      }
      res.status(204).send();
    }
  );
});

// Milestone 4: API per ottenere un singolo post
app.get("/posts/:id", (req, res) => {
  const postId = req.params.id;
  connection.query(
    "SELECT * FROM posts WHERE id = ?",
    [postId],
    (err, results) => {
      if (err) {
        console.error("Errore nel recupero del post:", err);
        return res.status(500).json({ error: "Errore nel server" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Post non trovato" });
      }
      res.json(results[0]);
    }
  );
});

// Avvio del server
app.listen(PORT, () => {
  console.log(`🚀 Server in esecuzione su http://localhost:${PORT}`);
});
