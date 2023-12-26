// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, path.join(__dirname,'../../public/images/products'));
    },
    filename:(req,file,cb) => {
        const newFilename = Date.now() +"_" + file.originalname;
        cb(null,newFilename);
    }
});

const uploadFile = multer({storage});

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

// /*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
//router.post('/create', productsController.store); 
router.post('/store', uploadFile.array('images',4), productsController.store); 


/*** GET ONE PRODUCT ***/ 
//router.get('/:id', productsController.detail); 
router.get('/detail/:id', productsController.detail); 

// /*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
//router.put('/edit/:id', productsController.update); 
router.put('/edit/update/:id', uploadFile.array('image',4), productsController.update); 


// /*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
