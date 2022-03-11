require("dotenv").config();
const express = require("express");
const db = require("./db/conn");
const app = express();

app.use(express.static("public"));

app.get("/api/students", (_, res) => {
  db.query("SELECT * FROM student").then((data) => {
    res.json(data.rows);
  });
});

app.listen(3000, () => {
  console.log(`listening on Port ${3000}`);
});
