const AllianceDAO = require('../models/AllianceDAO');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	AllianceDAO.getAll()
	.then((alliances) => {
		res.send(alliances);
	});
});

router.get('/:id', function(req, res, next) {
	var id = parseInt(req.params.id)
	AllianceDAO.getByID(id)
	.then((alliances) => {
		res.send(alliances);
	})
	.catch((error) =>
		res.send(error)
		)

});

router.post('/', function(req, res, next) {
	var name = req.body.alliance.name
	AllianceDAO.createAlliance(name)
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
	var id = req.body.alliance.id
	if(urlid==id){
		AllianceDAO.deleteAlliance(id)
		.then((result) => {
			res.send(result)
		})
			.catch((error) => {
				res.status(500)
					.json({
						status: 'Error',
						message: error
					})
			})
	}

});

router.put('/:id', function(req, res, next) {
	var urlid = parseInt(req.params.id)
	var id = req.body.alliance.id
	var name = req.body.alliance.name
	if (urlid == id){
		AllianceDAO.updateAlliance(id, name)
		.then((result) => {
			res.status(200)
			res.send(result)
		})
			.catch((error) => {
			res.status(500)
				.json({
					status: 'Error',
					message: error
				})
			})
	}

});

module.exports = router;

