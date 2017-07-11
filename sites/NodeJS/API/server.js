var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var db = require('./db');
var usersController = require('./controllers/users');

var app = express();
var corsOptions = {
  origin: 'http://localhost:3012'
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true } ) );

app.get('/', function(req, res) { // Главная страница
    res.send('Hello API');
})

app.get('/users', usersController.all) // Получить всех пользователей

app.get('/users/:id', usersController.findById) // Получить пользоватял по id

app.post('/users', usersController.create) // Добавление нового пользователя

app.put('/users/:id', usersController.update) // Обновление данных

app.delete('/users/:id', usersController.delete) // Удаление пользователя

db.connect('mongodb://localhost:27017/heyu', function(err) { // Подключаемся к БД
    if (err) {
        return console.log(err);
    }
    app.listen(3012, function() { // Запуск сервера на 3012 порту
        console.log('API app started');
    })
})