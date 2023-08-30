const express = require('express')
const path = require('path');
const PORT = 3000
const app = express()
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const store = require('store')
const isAuthenticated = require('./middlewares/isAuthenticated');
const authenticateJWT = require('./middlewares/checkForToken')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))


const secretKey = 'secretkey';

// Sample user data (for demonstration purposes)
const users = [
    { id: 1, username: 'user1', password: 'pa' },
    { id: 2, username: 'user2', password: 'pa' }
];


app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/login',(req,res)=>{
    res.render('login')
})
// app.post('/login',(req,res)=>{
//     const {username,password}= req.body;

//     const user = users.find(u => u.username === username && u.password === password);

//     if (!user) return res.status(401).json({ message: 'Authentication failed.' });

//     const token = jwt.sign({ username: user.username, id: user.id }, secretKey);
//     res.set('Authorization', {token}).render('protected')
    
// })

// app.get('/protected',authenticateJWT, (req, res) => {
//     res.render('protected')
// });

// app.get('/logout', (req, res) => {
//     res.json({ message: 'Logged out successfully.' });
// });

app.listen(PORT,()=>{
    console.log("Listen")
})
