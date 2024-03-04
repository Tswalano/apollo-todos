const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Replace with your MySQL connection details
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database',

});

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Middleware for verifying JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
};

// Signup endpoint
app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    // Perform validation and hashing of passwords in a real application
    const hashedPassword = password;

    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error creating user' });
        }
        res.status(201).json({ message: 'User created successfully' });
    });
});

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Perform validation and hashing of passwords in a real application
    const hashedPassword = password;

    db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, hashedPassword], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error logging in' });
        }

        if (result.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = result[0];

        const token = jwt.sign({ userId: user.id, username: user.username }, 'your_secret_key', { expiresIn: '1h' });

        res.status(200).json({ token });
    });
});

// Get user's todo items endpoint (requires authentication)
app.get('/todos', verifyToken, (req, res) => {
    const userId = req.user.userId;

    db.query('SELECT * FROM todos WHERE user_id = ?', [userId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error fetching todos' });
        }

        res.status(200).json(result);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
