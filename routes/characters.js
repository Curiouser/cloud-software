const characterDAO = require('../models/characterDAO');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	characterDAO.getAll()
	.then((character) => {
		res.status(200)
		.json({
			status: "success",
			characters: character
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
	characterDAO.getByID(id)
	.then((character) => {		
		res.status(200)
		.json({
			status: "success",
			character: character
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

router.get('/:id/allies/:radius', function(req, res, next) {
	var id = parseInt(req.params.id)
	var radius = parseInt(req.params.radius)
	characterDAO.getAlliesInRadius(id,radius)
	.then((characters) => {
		res.status(200)
		.json({
			status: "success",
			characters: characters
		});
		res.send();
	})
	.catch((error) => {
		res.status(500)
		// .json({
		// status: 'Error',
		// message: error
		// })
		res.send(error)}
	)
});

router.get('/all/:class', function(req, res, next) {
	var paramClass = req.params.class
	
	characterDAO.getByClass(paramClass)
	.then((characters) => {		
		res.status(200)
		.json({
			status: "success",
			characters: characters
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

router.post('/', function(req, res, next) {
	var name = req.body.character.name
	var charclass = req.body.character.class
	var user_id = req.body.character.user_id
	var point = req.body.character.position

	characterDAO.createCharacter(name, charclass, user_id, point)
	.then((result) => {
		res.status(200)
		.json({
			status: "success",
			message: "Inserted one character",
			character: result
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

router.delete('/:id', function(req, res, next) {
	var urlid = parseInt(req.params.id)
	characterDAO.deleteCharacter(urlid)
	.then((result) => {
		res.status(200)
		.json({
			status: "success",
			message: result
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

router.put('/:id', function(req, res, next) {
	var urlid = parseInt(req.params.id)
	var name = req.body.character.name
	var charclass = req.body.character.class
	var user_id = req.body.character.user_id
	var point = req.body.character.position

	characterDAO.updateCharacter(urlid, name, charclass, user_id, point)
	.then((result) => {
		res.status(200)
		.json({
			status: "success",
			message: "modified a character",
			character: result
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

module.exports = router;