const express = require('express');
const asyncHandler = require('express-async-handler');
const userModel = require('../models/users');
const roleModel = require('../models/role.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
let verif = true;

const register = async (req, res) => {
    
    try {
        // if(verif){
        //     const roleName = ['client', 'admin', 'manager'];
        //     const addrole = await roleModel.insertMany(roleName.map(role_name=>({role_name})));

        //     verif = false;
        // }
        // Vérifier si l'e-mail est déjà utilisé
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
        // const refreshToken = generateRefreshToken ({user: req.body.email})
     
        // Répondre avec le nouvel utilisateur
      
        const link = `http://localhost:3000/api/verifemail?token=${accessToken}`;
        const email = req.body.email
        const verififemail = async (email,link)=>{

    
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "70689edb6eeaba",
                pass: "9ac5f8be3fac52"
            }
            });
          
          const mailOptions = {
            from: 'hicham@support.com',
            to: email, 
            subject: 'Account Verification',
            text: 'Welcome ',
            html: `<p>Click the button below to verify your account:</p>
            <a href=${link} style="background-color: #4CAF50; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin-top: 20px;">Verify Account</a>
            
            `
          };
          
          transport.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error.message);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        };
        verififemail(email,link)
        res.status(200).json({
            status: 200,
            message: 'Utilisateur enregistré avec succès.',
            message : 'voir ton mail ',
            data: newUser,
            accessToken: accessToken
        });
       

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }

    

       // accessTokens
    function generateAccessToken(user) {
        const algorithm = 'HS256'; // Spécifiez l'algorithme ici
       const accessToken =  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {algorithm: algorithm, expiresIn: "10m"}) 
       return accessToken;
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
         const verifyexistEmail = await userModel.findOne({ email :loginEmail})
         console.log(verifyexistEmail.password , loginPassword);
         if (!verifyexistEmail) {
              return  res.json({
                    "message" : "email invalid  ",
                })
        }
        if (bcrypt.compare(loginPassword,verifyexistEmail.password)){

            return res.json({
                "message" : " vous aver crée un compte avec success",
            })

        }           
        else{

             return res.json({
                 "message" : "password is incorrecte",
             })

         }


        
           

       } catch (error) {
        res.json({'message' : error.message})
       }



};

module.exports = {
    register,
    login
};
