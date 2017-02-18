const UserDAO = require('../models/UserDAO');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	UserDAO.getAll()
	.then((users) => {
		res.status(200)
		.json({
			status: "success",
			users: users
		});
		res.send();
	})
	.catch((error) =>
		res.status(500)
		.json({
		status: 'Error',
		message: error
		})
	)
});

router.get('/:id', function(req, res, next) {
	var id = parseInt(req.params.id)
	UserDAO.getByID(id)
	.then((users) => {
		res.status(200)
		.json({
			status: "success",
			user: users
		});
		res.send()
	})
	.catch((error) =>
		res.status(500)
		.json({
		status: 'Error',
		message: error
		})
	)
});

router.get('/:id/characters', function(req, res, next) {
	var id = parseInt(req.params.id)
	UserDAO.getCharactersFromID(id)
	.then((characters) => {
		res.status(200)
		.json({
			status: "success",
			characters: characters
		});
		res.send()
	})
	.catch((error) =>
		res.status(500)
		.json({
		status: 'Error',
		message: error
		})
	)
});


router.post('/', function(req, res, next) {
	var name = req.body.user.name
	var email = req.body.user.email
	UserDAO.createUser(name, email)
	.then((result) => {
		res.status(200)
		.json({
			status : "success",
			message: "Inserted one user",
			user : result
		});
		res.send()
	})
	.catch((error) =>
		res.status(500)
		.json({
		status: 'Error',
		message: error
		})
	)

});
	

router.delete('/:id', function(req, res, next) {
	var urlid = parseInt(req.params.id)
	UserDAO.deleteUser(urlid)
	.then((result) => {
		res.status(200)
		.json({
			status: "success",
			message: result
		})
	res.send()
	})
	.catch((error) =>
		res.status(500)
		.json({
		status: 'Error',
		message: error
		})
	)

});


router.put('/:id', function(req, res, next) {
	var urlid = parseInt(req.params.id)
	var name = req.body.user.name
	var email = req.body.user.email
	var alliance = req.body.user.alliance_id
	UserDAO.updateUser(urlid, name, email, alliance)
	.then((result) => {
		res.status(200)
		.json({
			status : "success",
			message: "modified a user",
			user : result
		});
		res.send()
	})
	.catch((error) =>
		res.status(500)
		.json({
		status: 'Error',
		message: error
		})
	)
	
});


module.exports = router;
