
require("dotenv").config(); // TODO: ADD THIS LINE
const express = require("express");
const app = express();
const db = require("./db/db_configuration");

app.get("api/students", (req, res) => {
  db.query("SELECT * FROM student", (err, data) => {
    res.json(data.rows);
  });
});

// TODO: Replace 3000 with process.env.PORT
app.listen(process.env.port, () => {
  console.log(`listening on Port${process.env.port}`);
});
