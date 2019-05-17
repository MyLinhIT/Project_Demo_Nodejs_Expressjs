const User = require("../models/user.model");

// Create a new user
exports.create = (req, res) => {
  if (!req.body.name) {
    return res.status(404).send({
      message: "User name can not be empty"
    });
  }
  const user = new User({
    name: req.body.name,
    displayName: req.body.displayName,
    age: req.body.age,
    phone: req.body.phone
  });

  user
    .save()
    .then(user => res.status(200).send(user))
    .catch(err => {
      res.status(500).send({
        message: "Some error while creating a user"
      });
    });
};

// Retrieving and return all users to the database
exports.findAll = (req, res) => {
  User.find()
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.status(500).send({
        message: "Some error occurred while retrieving users"
      });
    });
};

// Retrieving a user with userId
exports.findOne = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId
        });
      }
      res.send(user);
    })
    .catch(err => {
      if (err.kind === "ObjectID") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId
        });
      }
      res.status(500).send({
        message:
          "Some error occurred while retrieving user with id " +
          req.params.userID
      });
    });
};

// Update a user with userId
exports.update = (req, res) => {
  const id = req.params.userId;
  const user = {
    name: req.body.name,
    displayName: req.body.displayName,
    age: req.body.age,
    phone: req.body.phone
  };
  User.findByIdAndUpdate(id, user, { new: true })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + id
        });
      }
      res.send(user);
    })
    .catch(err => {
      if (err.kind === "ObjectID" || err.name === "NotFound") {
        return res.status(404).send({
          message: "User not found with id " + id
        });
      }
      res.status(500).send({
        message: "Some error occurred while retriving user with id " + id
      });
    });
};

// Delete a user with userId

exports.delete = (req, res) => {
  const id = req.params.userId;
  User.findByIdAndDelete(id)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + id
        });
      }
      res.send("User deleted successfully");
    })
    .catch(err => {
      if (err.kind === "Object" || err.name === "NotFound") {
        return res.status(404).send({
          message: "User not found with id " + id
        });
      }
      res.status(500).send({
        message: "Some error occurred while retrieving user with id " + id
      });
    });
};
