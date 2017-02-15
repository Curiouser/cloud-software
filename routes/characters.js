const characterDAO = require('../models/characterDAO');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	characterDAO.getAll()
	.then((character) => {
		res.send(character);
	});
});


router.get('/:id', function(req, res, next) {
	var id = parseInt(req.params.id)
	characterDAO.getByID(id)
	.then((character) => {
		res.send(character);
	})
	.catch((error) =>
		res.send(error)
		)

});

router.post('/', function(req, res, next) {
	var name = req.body.character.name
	var charclass = req.body.character.class
	var user_id = req.body.character.user_id
	var point = req.body.character.point

	characterDAO.createCharacter(name, charclass, user_id, point)
	.then((result) => {
		res.status(200)
		res.send(result)
	})
		.catch((error) =>
		res.send(error)
		)

});

router.delete('/:id', function(req, res, next) {
	var urlid = parseInt(req.params.id)
	var id = req.body.character.id
	if(urlid==id){
		characterDAO.deleteCharacter(id)
		.then((result) => {
			res.status(200)
			res.send(result)
		})
			.catch((error) =>
			res.send(error)
			)
	}

});

router.put('/:id', function(req, res, next) {
	var urlid = parseInt(req.params.id)
	var id = req.body.character.id
	var name = req.body.character.name
	if (urlid == id){
		characterDAO.updatecharacter(id, name)
		.then((result) => {
			res.status(200)
			res.send(result)
		})
			.catch((error) =>
			res.send(error)
			)
	}

});

module.exports = router;