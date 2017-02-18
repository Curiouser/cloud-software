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
	return DB.accessor.one('SELECT * FROM alliances WHERE id =${i}',{i: _id}) 
		.then((result) => { 
			return result;
		})
		.catch((error) => {
		throw error;
		})
	},

	getUsersFromID(_id) {
	return DB.accessor.any('SELECT * FROM Users WHERE alliance_id =${i}',{i: _id}) 
		.then((result) => { 
			return result;
		})
		.catch((error) => {
		throw error;
		})
	},

	getCharactersFromID(_id) {
	return DB.accessor.any('select C.id, C.name, C.user_id, C.class, C.position from characters C '
			+'LEFT JOIN users U on C.user_id=U.id where U.alliance_id=${id} ORDER BY c.id',{id: _id}) 
		.then((result) => { 
			return result;
		})
		.catch((error) => {
		throw error;
		})
	},

	getCharactersFromIDWithClass(urlid, paramClass){
	//select c.id, C.name, C.user_id, C.class, C.position from characters C LEFT JOIN users U on C.user_id=U.id where U.alliance_id=1 ORDER BY c.id
	return DB.accessor.any('select C.id, C.name, C.user_id, C.class, C.position from characters C '
			+'LEFT JOIN users U on C.user_id=U.id where U.alliance_id=${id} AND C.class= ${c} ORDER BY c.id',{id: urlid, c: paramClass}) 
		.then((result) => { 
			return result;
		})
		.catch((error) => {
		throw error;
		})
	},

	createAlliance(name) {
	return DB.accessor.one(
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
		'DELETE FROM alliances WHERE id = ${i}',{
			i: id
		})
		.then((result) => {
			return result;
		})
		.catch((error) => {
			throw error;
		})
	},

	updateAlliance(id, name) {
	return DB.accessor.one(
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