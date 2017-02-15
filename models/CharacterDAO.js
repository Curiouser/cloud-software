const DB = require('../models/database'); // constante DB car on veut surtout pas que DB soit modifié

module.exports = { //exporte toutes les méthodes définies ci dessous

	getAll() {
	return DB.accessor.query('SELECT * FROM characters') //pas besoin de then, return db query est suffisant, on l'a fait juste pour l'exemple
		.then((result) => { //une fois qu'on a le result de la query, on fait le .then
			return result;
		})
		.catch((error) => {
		throw error;
		})
	},

	getByID(_id) {
	return DB.accessor.query('SELECT * FROM characters WHERE id = ' + _id) 
		.then((result) => { 
			return result;
		})
		.catch((error) => {
		throw error;
		})
	},

	createCharacter(name, charclass, user_id, point) {
	return DB.accessor.query(
		'INSERT INTO characters(name, class, user_id, point) VALUES (${n}, ${c}, ${uid}, ${p}) returning *',{
			n: name,
			c: charclass,
			uid: user_id,
			p: point
		})
		.then((result) => {
			return result;
		})
		.catch((error) => {
			throw error;
		})
	},

	deleteCharacter(id) {
	return DB.accessor.query(
		'DELETE FROM characters WHERE id = ${i} returning *',{
			i: id
		})
		.then((result) => {
			return result;
		})
		.catch((error) => {
			throw error;
		})
	},

	updateCharacter(id, name) {
	return DB.accessor.query(
		'UPDATE characters SET name=${n} WHERE id = ${i} returning *',{
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