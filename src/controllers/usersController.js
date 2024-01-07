const { log } = require('console');
const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator')

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
        }
         return res.send("Por fin te registraste...")
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