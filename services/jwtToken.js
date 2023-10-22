const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();


function generateAccessToken(user) {
   const accessToken =  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "10m"}) 
   return accessToken;
    }


    


module.exports = generateAccessToken;