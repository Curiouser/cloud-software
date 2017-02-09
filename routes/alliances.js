const AllianceDAO = require('../models/AllianceDAO');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	AllianceDAO.getAll()
	.then((users) => {
		res.send(users);
	});
});