const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { validateRegistrationData , validateloginData} = require('../middlewares/auth.middlewares');



const {
  register,
  login

}=require('../controllers/auth.controller') 
// Define your routes here

// router.get('/logout',logout);
router.post('/register',validateRegistrationData,register);
router.get('/login',validateloginData, login);
router.get('/verifemail', async (req, res) => {
  const token = req.query.token;

  // Vérifiez la validité du token ici
  try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      // Si le token est valide, marquez l'e-mail comme vérifié dans la base de données
      // ... votre code de mise à jour de la base de données ...

      res.send('Votre compte a été vérifié avec succès.');
  } catch (error) {
      // Si le token est invalide ou expiré, redirigez l'utilisateur vers une page d'erreur ou affichez un message d'erreur.
      res.status(400).send(error.message);
  }
});
// router.post('/login',login);
// router.get('/reset-password', resetPassword);
// router.post('/changePassword',updatePassword)

module.exports=router