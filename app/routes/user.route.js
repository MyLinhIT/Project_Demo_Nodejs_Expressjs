const express = require("express");
const user = express();
const users = require("../controllers/user.controller");

// Create a new user
user.post("/users", users.create);

// Retrieve all user
user.get("/users", users.findAll);

// Retrieve a user with userId
user.get("/users/:userId", users.findOne);

//Update a user with userId
user.put("/users/:userId", users.update);

//Delete a user with userId
user.delete("/users/:userId", users.delete);

module.exports = user;
