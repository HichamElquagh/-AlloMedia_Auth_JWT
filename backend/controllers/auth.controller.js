const express = require('express');
const asyncHandler = require('express-async-handler');
const userModel = require('../models/users');
const roleModel = require('../models/role.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const generateAccessToken = require('../services/jwtToken')
const verififemail = require('../services/verifEmail');
const verifToken = require('../services/verifToken')


const register = async (req, res) => {
    
    try {

        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Cet e-mail est déjà utilisé. Veuillez choisir un autre e-mail.' });
        }

        // Vérifier si le rôle est valide
        const role = await roleModel.findOne({ role_name: req.body.role });
        if (role.role_name === "manager") {
            return res.status(400).json({ message: 'vous avez pas le drois de s"inscrire tel que manager ' });
        }else if(!role){
            return res.status(400).json({ message: 'Rôle invalide.' });
        }

        // Hacher le mot de passe
        console.log('for password register' , req.body.password.length,);
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Créer un nouvel utilisateur
        const newUser = new userModel({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            role: role._id, // Attribuer l'ID du rôle
            password: hashedPassword
        });

        // Enregistrer l'utilisateur dans la base de données
        await newUser.save()
        const accessToken = generateAccessToken ({user: req.body.email})
        console.log('pour register ' + accessToken);
        // const refreshToken = generateRefreshToken ({user: req.body.email})
     
        // Répondre avec le nouvel utilisateur
      
        const link = `http://localhost:3000/api/verifemail?token=${accessToken}`;
        const email = req.body.email
        const subject = 'Account Verification'
        verififemail(email,subject,link);
  
           return res.status(201).json({
            'message' : 'activer votre compte virefier votre mail',
            'user': newUser,
            'token' : accessToken,
           })
       

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }

    

        // refreshTokens
    // let refreshTokens = []
    // function generateRefreshToken(user) {
    //     const refreshToken = 
    //     jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "20m"})
    //     refreshTokens.push(refreshToken)
    //     return refreshToken
    // }

    
};

const login = async (req , res)=>{

       try {
         const loginEmail = req.body.email;
         const loginPassword = req.body.password;
         const verifyexistEmail = await userModel.findOne({ email: loginEmail })
         .populate('role', 'role_name')
        //  .select('-_id -password -isverified');

         console.log(verifyexistEmail);
        console.log(verififemail);
         if (!verifyexistEmail) {
              return  res.status(404).json({
                    "message" : "email invalid  ",
                })
        }
        console.log('for password login' ,loginPassword.length , '000000');
        console.log('this is for hash password comming from user table',verifyexistEmail.password);

        const comparePassword =  await bcrypt.compare(loginPassword,verifyexistEmail.password)
        console.log(comparePassword);
        if (comparePassword){


        const accessToken = generateAccessToken ({user : loginEmail})

        res.cookie('access_token', accessToken, {
            httpOnly: true, // The cookie cannot be accessed via client-side JavaScript
            secure: process.env.NODE_ENV === 'production', // Ensures the cookie is only sent over HTTPS in production
            sameSite: 'Strict', // Protects against CSRF attacks
            maxAge: 3600000, // Expiry time in milliseconds (1 hour in this case)
        });

            return res.status(200).json({
                "message" : " vous aver crée un compte avec success",
                "data": {
                    first_name: verifyexistEmail.first_name,
                    last_name : verifyexistEmail.last_name,
                    email: verifyexistEmail.email,
                    role: verifyexistEmail.role.role_name
                },
                "token" : accessToken
            })

        }           
        else{

             return res.status(400).json({
                 "message" : "password is incorrecte",
             })

         }


        
           

       } catch (error) {
        res.json({'message' : error.message})
       }



};


const verifyAcountwithchecktoken = async(req , res)=> {
            const  token = req.query.token;
        try {

            const ischecked = verifToken(token)

            if(ischecked){
                const email = ischecked;

            const virefmail = await userModel.findOneAndUpdate(
                { email: email }, 
                { $set : { isverified : true } }, 
                { new: true },
            );
            res.send('votre compte a éte virefier');


            
        }else{

            res.send('virefication est expiré .');


        }
        } catch (error) {
            console.log(error);
            
        }







}







const forgotPassword = async (req , res )=>{
    console.log("ee forgotpassss ");
    const email = req.body.email;
    console.log(email);

    try {
        
        const verifyexistEmail = await userModel.findOne({
            email : email,
        });


        console.log(verifyexistEmail);
        if(verifyexistEmail){
            console.log(email);
            const accessToken = generateAccessToken({user: email})
            console.log(accessToken);

            const link = `http://localhost:3000/reset-password?token=${accessToken}`;
            const subject = 'Reset Password'

            verififemail(email,subject,link);

            res.json({
                "message" : "check your mail"
            })
     
        }else{

                res.json({
                    "message" : "pas de compte avec ce email"
                })
        }

        
    } catch (error) {
        console.log(error.message);
    }
}

const resetPassword =   async (req, res)=>{


    const  token = req.query.token;
    console.log("after check email " + token);
    try {
        console.log("after check email " + token);

        const ischecked = verifToken(token)

        console.log("after email for check tokeen " + ischecked);

        if(ischecked){

        //     console.log( "hhhhhhhhhhhhhhh   lkhrrr");
        // res.cookie('access_token', token, {
        //     httpOnly: true, // The cookie cannot be accessed via client-side JavaScript
        //     secure: true, // Ensures the cookie is only sent over HTTPS in production
        //     sameSite: 'Strict', // Protects against CSRF attacks
        //     maxAge: 3600000, // Expiry time in milliseconds (1 hour in this case)
        //   });
              
        res.send('vous pouver changer votre password ');


        
    }else{

        res.send('email inconnu');


    }
    } catch (error) {
        console.log(error.message);
        
    }
    


}

const resetPasswordAfterVerif = async (req , res)=>{
          
    const  token = req.body.token;
    console.log("this is token com from front restpassword ", token);
    const newpassword = req.body.password

    try {

        const ischecked = verifToken(token)

        if(ischecked){
            hashpassword = await bcrypt.hash(newpassword ,10)
            const email = ischecked;
            console.log('ce email est envoiyer depuis verif token in reset password  ',email);

        const virefmail = await userModel.findOneAndUpdate(
            { email: email }, 
            { $set : { password :  hashpassword} }, 
            { new: true },
        );
        res.send('votre password et changer ');


        
    }else{

        res.send('expirationd de password.');


    }
    } catch (error) {
        console.log(error.message);
        
    }





}

module.exports = {
    register,
    login,
    verifyAcountwithchecktoken,
    forgotPassword,
    resetPassword,
    resetPasswordAfterVerif
};
