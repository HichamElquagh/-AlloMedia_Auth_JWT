const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const userModel = require('../models/users');

const validateRegistrationData = [
    body('first_name').notEmpty().withMessage('Le prénom est requis'),
    body('last_name').notEmpty().withMessage('Le nom est requis'),
    body('email').isEmail().withMessage('Adresse e-mail invalide'),
    body('role').notEmpty().withMessage('il faut choisir entre livreur ou bien client in role'),
    body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),

    async (req, res, next) => {
        if (req.body.password !== req.body.confirm_password) {
            return res.json({
                'message' :  "c'est pas le meme password"
            });

        }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
      }
      next();
    }
  ];


  const validateloginData = [
    body('email').isEmail().withMessage('Adresse e-mail invalide'),
    body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
    async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    next();
    }


    

  ]

module.exports = {
    validateRegistrationData,
    validateloginData

}