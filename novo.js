const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;
//Ejs
const ejs = require('ejs');
const bcrypt = require('bcryptjs');
//Express sessions
const session = require('express-session');



//Ejs


app.set('view engine', 'ejs');
app.use(express.static('public'));
//Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Cors
app.use(cors());

app.use(session({
    secret: 'secret', cookie: { maxAge: 6000000 }, resave: false, saveUninitialized: false
}));




//Iniciar uma api que mostra index.ejs no /
app.get('/dashboard', (req, res) => {
    res.render('index')
});

//Iniciar uma api que mostra dashboard.ejs no /
app.get('/dashboard2', (req, res) => {
    res.render('dashboard')
});

//Login
app.get('/login', (req, res) => {
    res.render('login')
});

//Cadastro
app.get('/cadastro', (req, res) => {
    res.render('cadastro')
});

//Usuarios
app.get('/usuarios', (req, res) => {
    res.render('usuarios')
});

//Pesquisa

app.get('/questionarios', (req, res) => {
    res.render('questionarios')
});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});