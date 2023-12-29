const { log } = require('console');
const fs = require('fs');
const path = require('path');
const {v4 : uuidv4} = require('uuid');
const {leerArchivo,escribirArchivo} = require('../data/dataFunctions');

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
		const files = req.files;
		console.log("Esto es FILES: ",files);
		let products = leerArchivo("productsDataBase");
		const {name,description,price,discount,image,category} = req.body;
		const id = uuidv4();
		const images = [];
		files.forEach(element => {
			images.push(element.filename)
		});
		const product =  {
					id,
					name:name.trim(),
					description:description.trim(),
					price:+price,
					discount:+discount,
					image: files.length > 0 ? images : ["not-image.jpg"],
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
		const images = [];
		console.log("Esto es IMAGES antes: ",images);
		if(req.files){
			req.files.forEach(element => {
				images.push(element.filename)
			});
		}

		console.log("Esto es IMAGES despues: ",images);
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
					image: images.length > 0 ? images : product.image,
					category
				}
			};
			return product;
		})
		console.log("Esto es product: ",productsEdit);
		escribirArchivo(productsEdit,"productsDataBase")
		res.redirect(`/products/detail/${id}`);
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		let products = leerArchivo("productsDataBase");
		const {id} = req.params;
		const product = products.find(element => element.id == id)
		console.log("Esto es product: ",product);
		const newProducts = products.filter(product => product.id != id);
		const json = JSON.stringify(newProducts);
		console.log("Esto es json: ",json);
		console.log("Esto es image: ",product.image);
		if (typeof product.image == "string"){
			fs.unlink(path.join(__dirname,`../../public/images/products/${product.image}`), (err)=>{
				if(err) throw err;
				console.log("Borre el archivo ", product.image);
			});
		} else {	
			product.image.forEach(imagen =>{
				fs.unlink(path.join(__dirname,`../../public/images/products/${imagen}`), (err)=>{
					if(err) throw err;
					console.log("Borre el archivo ", product.image);
				});
			})
		}
		
		escribirArchivo(newProducts,"productsDataBase");
		res.redirect("/products");
	}
};

module.exports = productsController;