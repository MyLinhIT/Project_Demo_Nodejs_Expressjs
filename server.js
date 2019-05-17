const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const dbConfig = require("./config/database.config");
const noteRouter = require("./app/routes/note.route");
const userRouter = require("./app/routes/user.route");
//create express app
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(noteRouter);
app.use(userRouter);
//connecting to the database
mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.url, { useNewUrlParser: true })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connected to the database. Exiting now...", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "create express" });
});
app.get("/notes", noteRouter);
app.get("/users", userRouter);

app.listen(3000, () => {
  console.log("Server listen port 3000!!!");
});
