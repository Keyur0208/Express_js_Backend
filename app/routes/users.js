var express = require('express');
var router = express.Router();
const { getUserById } = require('../controller/auth.controller');
const authenicationToken = require('../utils/authMiddleware')

router.get('/getdata',authenicationToken,getUserById);

module.exports = router;
