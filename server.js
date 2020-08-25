const express = require('express');
const app = express();
const db = require('./db/db_configuration');

app.use(express.static('public'))

app.get('api/students', (req, res) => {
    db.query('SELECT * FROM student', (err, data) => {
        res.json(data.rows);
    })
})


app.listen(3000, () => {
    console.log('listening on Port 3000');
})

