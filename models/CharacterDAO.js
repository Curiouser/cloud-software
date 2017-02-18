const DB = require('../models/database'); // constante DB car on veut surtout pas que DB soit modifié
var pgp = require('pg-promise')();
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
	return DB.accessor.one('SELECT * FROM characters WHERE id = ${i}',{i: _id}) 
		.then((result) => { 
			return result;
		})
		.catch((error) => {
		throw error;
		})
	},

	getByClass(paramClass) {
	return DB.accessor.any('SELECT * FROM characters WHERE class = ${c}',{c: paramClass}) 
		.then((result) => { 
			return result;
		})
		.catch((error) => {
		throw error;
		})
	},
	getAlliesInRadius(id,radius) {
		var sqlquery = 'SELECT id, name, user_id, class, position, distance'+
						  ' FROM ('+
						 ' SELECT z.id, z.name, z.user_id, z.class, z.position,'+
						        'p.radius,'+
						        'p.distance_unit'+
						                 '* DEGREES(ACOS(COS(RADIANS(p.latpoint))'+
						                 '* COS(RADIANS(z.position[0]))'+
						                 '* COS(RADIANS(p.longpoint - z.position[1]))'+
						                 '+ SIN(RADIANS(p.latpoint))'+
						                 '* SIN(RADIANS(z.position[0])))) AS distance'+
						  ' FROM characters AS z '+
						  ' JOIN (   /* these are the query parameters */'+
						        ' SELECT  position[0]  AS latpoint,  position[1] AS longpoint,'+
						                '${radius} AS radius,      111.045 AS distance_unit'+
						    ' FROM characters where id= ${id}) AS p ON 1=1'+
						  ' WHERE'+ // z.alliance_id corresponds to p.alliance_id
						  		'z.position[0]'+
						     ' BETWEEN p.latpoint  - (p.radius / p.distance_unit)'+
						         ' AND p.latpoint  + (p.radius / p.distance_unit)'+
						    ' AND z.position[1]'+
						     ' BETWEEN p.longpoint - (p.radius / (p.distance_unit * COS(RADIANS(p.latpoint))))'+
						         ' AND p.longpoint + (p.radius / (p.distance_unit * COS(RADIANS(p.latpoint))))'+
						 ') AS d'+
						 ' WHERE distance <= radius'+
						 ' ORDER BY distance'

		return DB.accessor.any(sqlquery,{
			radius: radius/1000,
			id: id
		}) 
		.then((result) => { 
			return result;
		})
		.catch((error) => {
			// throw error.message=pgp.as.format(sqlquery,{
			// 	radius: radius,
			// 	id: id
			// });
			throw error;
		})
	},


	createCharacter(name, charclass, user_id, point) {
	return DB.accessor.one(
		'INSERT INTO characters(name, class, user_id, position) VALUES (${n}, ${c}, ${uid}, \'(${px},${py})\') returning *',{
			n: name,
			c: charclass,
			uid: user_id,
			px: point.x,
			py: point.y
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
		'DELETE FROM characters WHERE id = ${i}',{
			i: id
		})
		.then((result) => {
			return result;
		})
		.catch((error) => {
			throw error;
		})
	},

	updateCharacter(id, name, charclass, user_id, point) {
		console.log(pgp.as.format('UPDATE characters SET name=${n}, user_id=${uid}, class=${c}, position=\'(${px},${py})\' WHERE id = ${i} returning *',{
			i: id,
			n: name,
			c: charclass,
			uid: user_id,
			px: point.x,
			py: point.y
		}))
	return DB.accessor.one(
		'UPDATE characters SET name=${n}, user_id=${uid}, class=${c}, position=\'(${px},${py})\' WHERE id = ${i} returning *',{
			i: id,
			n: name,
			c: charclass,
			uid: user_id,
			px: point.x,
			py: point.y
		})
		.then((result) => {
			return result;
		})
		.catch((error) => {
			throw error;
		})
	}
}