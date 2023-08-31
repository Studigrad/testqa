const express = require('express')
const path = require('path');
const PORT = 3000
const app = express()
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const session = require('express-session');
const store = require('store')
const isAuthenticated = require('./middlewares/isAuthenticated');
const authenticateJWT = require('./middlewares/checkForToken')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
// Use body-parser middleware for form data
app.use(bodyParser.urlencoded({ extended: false }));

const secretKey = 'secretkey';

// Sample user data (for demonstration purposes)
const users = [
    { id: 1, username: 'user1', password: 'pa' },
    { id: 2, username: 'user2', password: 'pa' }
];


// Set up sessions
app.use(session({
  secret: secretKey,
  resave: true,
  saveUninitialized: true
}));

// Login route
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    req.session.loggedIn = true;
    res.redirect('/protected');
  } else {
    res.redirect('/login');
  }
  
});

// Protected route
app.get('/protected', (req, res) => {
  if (req.session.loggedIn) {
    res.render('protected');
  } else {
    res.redirect('/login');
  }
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.loggedIn = false;
  res.redirect('/login');
});

// Public route
app.get('/public', (req, res) => {
  res.render('public')
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
