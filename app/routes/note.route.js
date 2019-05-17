const express = require("express");
const note = express();

const notes = require("../controllers/note.controller");

// Create a new note
note.post("/notes", notes.create);

// Retrieve all notes
note.get("/notes", notes.findAll);

// Retrieve a single node with noteId
note.get("/notes/:noteId", notes.findOne);

// Update a note with noteId
note.put("/notes/:noteId", notes.update);

// Delete a node with noteId
note.delete("/notes/:noteId", notes.delete);

module.exports = note;
