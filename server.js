
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 49947;

app.use(cors());
app.use(express.json()); 

//database connection setup
const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: '123456', 
    database: 'my_database', 
});

db.connect(err => {
    if(err) throw err;
    console.log('Connected to MySQL Database.');
});


app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).json(err);
        return res.json(results);
    });
});

app.post('/api/users', (req, res) => {
    const { username, password } = req.body;
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, results) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json({ id: results.insertId, username });
    });
});

// For products management
app.get('/api/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) return res.status(500).json(err);
        return res.json(results);
    });
});

app.post('/api/products', (req, res) => {
    const { name, description, category, price, quantity } = req.body;
    db.query('INSERT INTO products (name, description, category, price, quantity) VALUES (?, ?, ?, ?, ?)',
        [name, description, category, price, quantity], (err, results) => {
            if (err) return res.status(500).json(err);
            return res.status(201).json({ id: results.insertId, name });
        });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});