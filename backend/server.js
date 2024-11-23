const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(
  "mongodb+srv://pargundesunit95:Iuwg6QPOzXHn9uKS@notekeeper.olqho.mongodb.net/?retryWrites=true&w=majority&appName=NoteKeeper",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB Atlas!");
});

// Schema and Model
const noteSchema = new mongoose.Schema({
  title: String,
  tagline: String,
  body: String,
  isPinned: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Note = mongoose.model("Note", noteSchema);

// Routes
app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find().sort({ isPinned: -1, createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes" });
  }
});

app.post("/notes", async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Error adding note" });
  }
});

app.put("/notes/:id", async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: "Error updating note" });
  }
});

app.delete("/notes/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
