const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
app.use(cors())
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database("./test.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message)
})
// const createTableSql = `CREATE TABLE users(id INTEGER PRIMARY KEY,name,age,address,occupation)`;
// db.run(createTableSql);

app.get('/users', (req, res) => {
  const sql = `SELECT * from users`
  db.all(sql, [], (err, rows) => {
    if (err){ 
        res.status(400).json({"error":err.message});
        return;
    }
    res.json({users: rows})
  })
})

app.post('/users', (req, res) => {
  const user = req.body
  sql = `INSERT INTO users(name,age,address,occupation) VALUES(?,?,?,?)`
  db.run(sql, [user.name, user.age, user.address, user.occupation], (err) => {
      if (err) return console.error(err.message);
      res.status(200).send('ok')
  })
})

app.delete('/users', (req, res) => {
  sql = `DELETE FROM users WHERE id=${req.query.id}`
  db.run(sql, [], (err) => {
    if (err) return console.error(err.message);
    res.status(200).send('ok')
  })
})

app.patch('/users', (req, res) => {
  const user = req.body
  sql = `UPDATE users set 
    name = COALESCE(?,name), 
    age = COALESCE(?,age), 
    address = COALESCE(?,address),
    occupation =  COALESCE(?,occupation)
    WHERE id = ?`
  db.run(sql, [user.name, user.age, user.address, user.occupation, user.id], (err) => {
    if (err) return console.error(err.message)
    res.status(200).send('ok')
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})