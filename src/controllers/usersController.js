const { log } = require('console');
const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator')
const {leerArchivo,escribirArchivo} = require('../data/dataFunctions');

const userController = {
    formRegisterUser:(req,res)=>{
        res.render('form-register-user');
    },
    formAdminRegister:(req,res)=>{
        // res.send('Aca se van a registrar los Administradores con permisos')
        res.render('form-register-admin');
    },
    userRegister:(req,res)=>{
        res.redirect('/user/login');
    },
    adminRegister:(req,res)=>{
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0){
            res.render('form-register-admin', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        } else {
        const file = req.file;
        console.log('Esto es FILEEEEE: ',file);
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
         return res.send('admin registrado')
        // res.redirect('/user/admin/login');
    },
    formLoginUser:(req,res)=>{
        res.render('form-login-user');
    },
    formAdminLogin:(req,res)=>{
        res.send('Aca se van a loguear los Administradores con permisos')
        // res.render('form-login-admin');
    }
}

module.exports = userController;