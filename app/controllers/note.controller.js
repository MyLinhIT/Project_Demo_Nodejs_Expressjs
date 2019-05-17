const Note = require("../models/note.model");

// Create and save a note
exports.create = (req, res) => {
  console.log("req.body", req.body);
  if (!req.body.content) {
    return res.status(404).send({
      message: "Note content can not be empty"
    });
  }
  // create a note
  const note = new Note({
    title: req.body.title || "Untitled title",
    content: req.body.content
  });
  // save a Note in the database
  note
    .save()
    .then(data => {
      {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating a note"
      });
    });
};

// Retrieve and return all notes from the database
exports.findAll = (req, res) => {
  Note.find()
    .then(notes => res.send(notes))
    .catch(err => {
      res.status(500).send({
        message: "Some error occurred while retrieving notes"
      });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
  const id = req.params.noteId;
  Note.findById(id)
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + id
        });
      }
      res.send(note);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id" + id
        });
      }
      res.status(500).send({
        message: "Some error occurred while retrieving note"
      });
    });
};

// Update a note indentified by noteId in the request
exports.update = (req, res) => {
  const id = req.params.noteId;
  const note = new Note({
    title: req.body.title || "Untitled Note",
    content: req.body.content
  });
  Note.findByIdAndUpdate(
    id,
    {
      title: req.body.title || "Untitled Note",
      content: req.body.content
    },
    { new: true }
  )
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + id
        });
      }
      res.send(note);
    })
    .catch(err => {
      if (err.kind == "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id" + id
        });
      }
      res.status(500).send({
        message: "Some error occurred while retrieving note"
      });
    });
};

// Delete a note with specified noteId in the request
exports.delete = (req, res) => {
  Note.findByIdAndDelete(req.params.noteId)
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId
        });
      }
      res.send("Note deleted successfully");
    })
    .catch(err => {
      if (err.kind == "ObjectId" || err.name == "NotFound") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId
        });
      }
      return res.status(500).send({
        message: "Could not delete note with id " + req.params.noteId
      });
    });
};
