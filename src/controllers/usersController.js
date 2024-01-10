const { log } = require('console');
const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator')
const {leerArchivo,escribirArchivo} = require('../data/dataFunctions');

const userController = {
    //Aca se va a mostrar el formulario de registro para los usuarios
    formRegisterUser:(req,res)=>{
        res.render('form-register-user');
    },

    //Aca se va a mostrar el formulario de registro para los administradores
    formAdminRegister:(req,res)=>{
        res.render('form-register-admin');
    },

    //Aca se va a procesar el formulario de registro para los usuarios
    userRegister:(req,res)=>{
        res.redirect('/user/login');
    },

    //Aca se va a procesar el formulario de registro para los administradores
    adminRegister:(req,res)=>{
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0){
            res.render('form-register-admin', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        } else {
        const file = req.file;
		let adminUsers = leerArchivo("adminDataBase");
		const {name,surname,numberFile,category,imageAdmin,email,contrasenia} = req.body;
		const admin =  {
					name:name.trim(),
					surname:surname.trim(),
					numberFile:+numberFile,
					category:category,
                    imageAdmin: file ? file.filename : "no-user-img.jpg",
					email:email.trim(),
                    contrasenia:contrasenia
				};
		adminUsers.push(admin);		
		escribirArchivo(adminUsers,"adminDataBase")
        }
        
        res.redirect('/users/admin/login');
    },

    //Aca se va a mostrar el formulario de logueo para los usuarios
    formLoginUser:(req,res)=>{
        //res.render('form-login-user');
    },

    //Aca se va a mostrar el formulario de logueo para los administradores
    formAdminLogin:(req,res)=>{
       res.render('form-login-admin');
    }
}

module.exports = userController;