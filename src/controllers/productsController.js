const { log } = require('console');
const fs = require('fs');
const path = require('path');
const {v4 : uuidv4} = require('uuid');
const {leerArchivo,escribirArchivo} = require('../data/dataFunctions');


// const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const productsController = {
	// Root - Show all product
	index: (req, res) => {
		let products = leerArchivo("productsDataBase");
		res.render('products',{title:'Products', products, toThousand})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const {id} = req.params;
		let products = leerArchivo("productsDataBase");
		const product = products.find(element => element.id == id);
		res.render('detail',{title: product.name, product, toThousand})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form',{title:'Product Create'})
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let products = leerArchivo("productsDataBase");
		const {name,description,price,discount,image,category} = req.body;
		const id = uuidv4();
		const product =  {
					id,
					name:name.trim(),
					description:description.trim(),
					price:+price,
					discount:+discount,
					image:"default-image.png",
					category
				};
		products.push(product);		
		escribirArchivo(products,"productsDataBase")
		res.redirect("/products");
	},

	// Update - Form to edit
	edit: (req, res) => {
		let products = leerArchivo("productsDataBase");
		const {id} = req.params;
		const productToEdit = products.find(element => element.id == id);
		res.render('product-edit-form',{title:'Product Edit', productToEdit})	
	},
	// Update - Method to update
	update: (req, res) => {
		let products = leerArchivo("productsDataBase");
		const {name,description,price,discount,image,category} = req.body;
		const {id} = req.params;
		const productsEdit = products.map(product => {
			if (product.id == id) {
				return {
					id,
					name:name.trim(),
					description:description.trim(),
					price:+price,
					discount:+discount,
					image: (image ? image : product.image),
					category
				}
			};
			return product;
		})
		escribirArchivo(productsEdit,"productsDataBase")
		res.redirect(`/products/detail/${id}`);
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		let products = leerArchivo("productsDataBase");
		const {id} = req.params;
		const newProducts = products.filter(product => product.id != id);
		escribirArchivo(newProducts,"productsDataBase")
		res.redirect("/products");
	}
};

module.exports = productsController;