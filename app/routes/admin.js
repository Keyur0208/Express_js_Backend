var express = require('express');
const { User_Deatils } = require('../controller/auth.controller');
var router = express.Router();

router.get('/record',User_Deatils);

module.exports = router;
