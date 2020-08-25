const express = require('express');
const app = express()
const db = require('./db/db_configuration')

app.get('/', (req, res) => {
    db.query('SELECT * FROM student', (err, data) => {
        console.log(err,data)
        res.json(data.rows);
    })
})


app.listen(3000, () => {
    console.log('listening on Port 3000');
})

