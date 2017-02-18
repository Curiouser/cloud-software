const DB = require('../models/database'); // constante DB car on veut surtout pas que DB soit modifié
var pgp = require('pg-promise')();
var qrm = pgp.queryResult;
module.exports = { //exporte toutes les méthodes définies ci dessous

	getAll() {
	return DB.accessor.query('SELECT * FROM users', undefined, qrm.many) //pas besoin de then, return db query est suffisant, on l'a fait juste pour l'exemple
		.then((result) => { //une fois qu'on a le result de la query, on fait le .then
			return result;
		})
		.catch((error) => {
		throw error;
		})
	},

	getByID(_id) {
	return DB.accessor.one('SELECT * FROM users WHERE id = ' + _id) 
		.then((result) => {
			return result;
		})
		.catch((error) => {
		throw error;
		})
	},

	getCharactersFromID(_id) {
	return DB.accessor.any('SELECT * FROM characters WHERE user_id=' + _id)
		.then((result) => {
			return result;
		})
		.catch((error) => {
		throw error;
		})
	},

	createUser(username, email) {
	return DB.accessor.one(
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
	return DB.accessor.query(
		'DELETE FROM users WHERE id = ${i}',{
			i: id
		})
		.then((result) => {
			return result;
		})
		.catch((error) => {
			throw error;
		})
	},

	updateUser(id, name, email, alliance_id) {
	return DB.accessor.one(
		'UPDATE users SET name= ${n}, email= ${e}, alliance_id= ${a} WHERE id = ${i} returning *',{
			i: id,
			n: name,
			e: email,
			a: alliance_id
		})
		.then((result) => {
			return result;
		})
		.catch((error) => {
			throw error;
		})
	}

}