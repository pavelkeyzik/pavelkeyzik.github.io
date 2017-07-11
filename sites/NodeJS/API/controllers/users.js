var Users = require('../models/users');

exports.all = function(req, res) { // Получить всех пользователей
    Users.all(function(err, docs) {
        if(err) {
            console.log(err);
            res.sendStatus(500);
        }
        res.send(docs);
    })
}

exports.findById =  function(req, res) { // Получить пользоватял по id
    Users.findById(req.params.id, function(err, doc) {
        if(err) {
            console.log(err);
            res.sendStatus(500);
        }
        res.send(doc);
    })
}

exports.create = function(req, res) { // Добавление нового пользователя
    var user = {
        name: req.body.name,
        online: req.body.online,
        avatar: req.body.avatar
    }
    Users.create(user, function(err, result) {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(user);
    })
}

exports.update = function(req, res) { // Обновление данных
    Users.update(req.params.id,
        {
            name: req.body.name,
            online: req.body.online,
            avatar: req.body.avatar 
        }
        , function(err, result) {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
}

exports.delete = function(req, res) { // Удаление пользователя
    Users.delete(req.params.id, function(err, result) {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
}