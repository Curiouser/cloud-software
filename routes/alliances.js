const AllianceDAO = require('../models/AllianceDAO');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	AllianceDAO.getAll()
	.then((alliances) => {
		res.status(200)
		.json({
			status: "success",
			alliances: alliances
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

router.get('/:id', function(req, res, next) {
	var id = parseInt(req.params.id)
	AllianceDAO.getByID(id)
	.then((alliances) => {
		res.status(200)
		.json({
			status: "success",
			alliance: alliances
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

router.get('/:id/users', function(req, res, next) {
	var urlid = parseInt(req.params.id)
	AllianceDAO.getUsersFromID(urlid)
	.then((users) => {
		res.status(200)
		.json({
			status: "success",
			users: users
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
	var urlid = parseInt(req.params.id)
	AllianceDAO.getCharactersFromID(urlid)
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

router.get('/:id/characters/:class', function(req, res, next) {
	var urlid = parseInt(req.params.id)
	var paramClass = req.params.class
	AllianceDAO.getCharactersFromIDWithClass(urlid, paramClass)
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
	var name = req.body.alliance.name
	AllianceDAO.createAlliance(name)
	.then((result) => {
		res.status(200)
		.json({
			status: "success",
			message: "Inserted one alliance",
			alliance: result
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
	AllianceDAO.deleteAlliance(urlid)
	.then((result) => {
		res.status(200)
		.json({
			status: "success",
			message: result
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

router.put('/:id', function(req, res, next) {
	var urlid = parseInt(req.params.id)
	var name = req.body.alliance.name
	AllianceDAO.updateAlliance(urlid, name)
	.then((result) => {
		res.status(200)
		.json({
			status: "success",
			message: "modified a alliance",
			alliance: result
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

