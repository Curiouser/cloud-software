const DB = require('../models/database'); // constante DB car on veut surtout pas que DB soit modifié

module.exports = { //exporte toutes les méthodes définies ci dessous

	getAll() {
	return DB.query('SELECT * FROM alliances') //pas besoin de then, return db query est suffisant, on l'a fait juste pour l'exemple
		.then((result) => { //une fois qu'on a le result de la query, on fait le .then
			return result;
		})
		.catch((error) => {
		throw error;
		})
	}
}