// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

// /*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
//router.post('/create', productsController.store); 
router.post('/store', productsController.store); 


/*** GET ONE PRODUCT ***/ 
//router.get('/:id', productsController.detail); 
router.get('/detail/:id', productsController.detail); 

// /*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
//router.put('/edit/:id', productsController.update); 
router.put('/edit/update/:id', productsController.update); 


// /*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
