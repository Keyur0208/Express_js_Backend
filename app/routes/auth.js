var express = require('express');
var routes = express.Router();
var {singup,login} = require('../controller/auth.controller');


routes.post('/singup',singup);

routes.post('/login',login);

module.exports = routes;
