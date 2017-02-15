const DB = require('../models/database'); // constante DB car on veut surtout pas que DB soit modifié

module.exports = { //exporte toutes les méthodes définies ci dessous

	getAll() {
	return DB.accessor.query('SELECT * FROM alliances') //pas besoin de then, return db query est suffisant, on l'a fait juste pour l'exemple
		.then((result) => { //une fois qu'on a le result de la query, on fait le .then
			return result;
		})
		.catch((error) => {
		throw error;
		})
	},

	getByID(_id) {
	return DB.accessor.query('SELECT * FROM alliances WHERE id = ' + _id) 
		.then((result) => { 
			return result;
		})
		.catch((error) => {
		throw error;
		})
	},

	createAlliance(name) {
	return DB.accessor.query(
		'INSERT INTO alliances(name) VALUES (${a}) returning *',{
			a: name
		})
		.then((result) => {
			return result;
		})
		.catch((error) => {
			throw error;
		})
	},

	deleteAlliance(id) {
	return DB.accessor.query(
		'DELETE FROM alliances WHERE id = ${i} returning *',{
			i: id
		})
		.then((result) => {
			console.log("deletealliance result")
			return result;
		})
		.catch((error) => {
			console.log("deletealliance catch triggered" + error.message)
			throw error;
		})
	},

	updateAlliance(id, name) {
	return DB.accessor.query(
		'UPDATE alliances SET name=${n} WHERE id = ${i} returning *',{
			i: id,
			n: name
		})
		.then((result) => {
			return result;
		})
		.catch((error) => {
			throw error;
		})
	}

}