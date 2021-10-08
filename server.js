require("dotenv").config();
const express = require("express");
const db = require("./db/db_configuration");
const app = express();

app.use(express.static("public"));

app.get("/api/students", (req, res) => {
  db.query("SELECT * FROM student").then((data) => {
    res.json(data.rows);
  });
});

app.listen(process.env.PORT, () => {
  console.log(`listening on Port ${process.env.PORT}`);
});
