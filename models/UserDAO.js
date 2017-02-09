const DB = require('../models/database'); // constante DB car on veut surtout pas que DB soit modifié

module.exports = { //exporte toutes les méthodes définies ci dessous

	getAll() {
	return DB.query('SELECT * FROM users') //pas besoin de then, return db query est suffisant, on l'a fait juste pour l'exemple
		.then((result) => { //une fois qu'on a le result de la query, on fait le .then
			return result;
		})
		.catch((error) => {
		throw error;
		})
	},

	getByID(_id) {
	return DB.query('SELECT * FROM users WHERE id = ' + _id) 
		.then((result) => { 
			return result;
		})
		.catch((error) => {
		throw error;
		})
	},

	createUser(username, email) {
	return DB.query(
		'INSERT INTO users(name, email) VALUES (${u},  ${e}) returning *',{
			u: username,
			e: email
		})
		.then((result) => {
			return result;
		})
		.catch((error) => {
			throw error;
		})
	},

	deleteUser(id) {
	return DB.query(
		'DELETE FROM users WHERE id = ${i} returning *',{
			i: id
		})
		.then((result) => {
			return result;
		})
		.catch((error) => {
			throw error;
		})
	},

	deleteUser(id) {
	return DB.query(
		'DELETE FROM users WHERE id = ${i} returning *',{
			i: id
		})
		.then((result) => {
			return result;
		})
		.catch((error) => {
			throw error;
		})
	},

	updateUser(id, name, email, alliance) {
	return DB.query(
		'SELECT * FROM users WHERE id = ${i} ',{ // non faire un update
			i: id
		})
		.then((result) => {
			return result;
		})
		.catch((error) => {
			throw error;
		})
	}

}