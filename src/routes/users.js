const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {body} = require('express-validator');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, './public/images/avatars')
    },
    filename:(req,file,cb)=>{
        let fileName = `${Date.now()}_img_${file.originalname}`;
        cb(null, fileName);
    }
});

const uploadFile = multer({storage}); 

const validationsAdmin = [
    body('name').notEmpty().withMessage('Por favor ingrese su NOMBRE'),
    body('surname').notEmpty().withMessage('Por favor ingrese su APELLIDO'),
    body('numberFile')
        .notEmpty().withMessage('Por favor ingrese su nro de LEGAJO').bail()
        .isNumeric().withMessage('Debe ingresar numeros unicamente'),
    body('category').notEmpty().withMessage('Por favor indique su CATEGORIA'),
    body('email')
        .notEmpty().withMessage('Por favor ingrese su EMAIL').bail()
        .isEmail().withMessage('Por favor, ingrese un EMAIL valido. Por ej: aaa@ddd.com'),
    body('contrasenia')
        .notEmpty().withMessage('Por favor ingrese una CONTRASEÑA de 8 digitos').bail()
        .isStrongPassword({ 
            minLength: 4, 
            minLowercase: 1, 
            minUppercase: 1, 
            minNumbers: 1, 
            minSymbols: 1, 
            returnScore: false, 
            pointsPerUnique: 1, 
            pointsPerRepeat: 0.5, 
            pointsForContainingLower: 10, 
            pointsForContainingUpper: 10, 
            pointsForContainingNumber: 10, 
            pointsForContainingSymbol: 10 })
        .withMessage('La CONTRASEÑA debe contener al menos 4 caracteres, entre ellos un numero y un simbolo')
]

const userController = require('../controllers/usersController')

/* GET users listing. */
router.get('/register', userController.formRegisterUser);
router.get('/admin/register', userController.formAdminRegister);
router.post('/register', userController.userRegister);
router.post('/admin/register', uploadFile.single('imageAdmin'), validationsAdmin, userController.adminRegister);
router.get('/login', userController.formLoginUser);
router.get('/admin/login', userController.formAdminLogin);

module.exports = router;
