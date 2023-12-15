const { log } = require('console');
const fs = require('fs');
const path = require('path');
const {leerArchivo,escribirArchivo} = require('../data/dataFunctions');

// const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const mainController = {
	index: (req, res) => {
		let products = leerArchivo("productsDataBase");
		res.render('index',{title:'Inicio', products, toThousand})
	},
	search: (req, res) => {
		const mensaje = "No hay productos que coincidan con esa búsqueda";
		let {keywords} = req.query;
			let products = leerArchivo("productsDataBase");
			let result = products.filter(product => product.name.toLowerCase().includes(keywords.toLowerCase()))
			res.render('results',{result, keywords, mensaje, toThousand})
	},
};

module.exports = mainController;