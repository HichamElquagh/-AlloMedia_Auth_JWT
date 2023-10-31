const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { validateRegistrationData , validateloginData, authMiddleware} = require('../middlewares/auth.middlewares');
const verifToken = require('../services/verifToken')



const {
  register,
  login,
  verifyAcountwithchecktoken,
  forgotPassword,
  resetPassword,
  resetPasswordAfterVerif

}=require('../controllers/auth.controller') 
// Define your routes here

// router.get('/logout',logout);
router.post('/register',validateRegistrationData,register);
router.post('/login',validateloginData, login);
router.get('/verifemail', verifyAcountwithchecktoken);
router.post('/forgotpassword',forgotPassword);
router.get('/resetpassword',resetPassword);
router.post('/reset_password',resetPasswordAfterVerif);


// router.get('/reset-password', resetPassword);
// router.post('/changePassword',updatePassword)

module.exports=router