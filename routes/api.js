const express = require('express');
const router = express.Router();
const { validateRegistrationData , validateloginData} = require('../middlewares/auth.middlewares');



const {
  register,
  login

}=require('../controllers/auth.controller') 
// Define your routes here

// router.get('/logout',logout);
router.post('/register',validateRegistrationData,register);
router.get('/login',validateloginData, login);
// router.post('/login',login);
// router.get('/reset-password', resetPassword);
// router.post('/changePassword',updatePassword)

module.exports=router