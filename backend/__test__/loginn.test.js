const bcrypt = require('bcrypt');
const { login } = require('../controllers/auth.controller'); // Import the login function
const userModel = require('../models/users'); // Import your userModel
const jwt = require('jsonwebtoken')
jest.mock('../models/users'); // Mock the userModel module


describe('login function', () => {
  it('should return 200 and a token on successful login', async () => {
    const secretekey = "shlkdqqqqqqqqqq"
    // Mock the userModel.findOne function to return a user with valid credentials
    userModel.findOne.mockResolvedValue({
      email: 'test@example.com',
      password: await bcrypt.hash('password123', 10),
      role: { role_name: 'user' },
    });

    // Mock the generateAccessToken function to return a mock token
    jwt.sign({ email: 'test@example.com',  },secretekey)

    const req = { body: { email: 'test@example.com', password: 'password123' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
    };

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: ' vous aver crée un compte avec success',
      data: {
        first_name: undefined, // Add the appropriate value based on your test case
        last_name: undefined, // Add the appropriate value based on your test case
        email: 'test@example.com',
        role: 'user',
      },
      token: 'mockAccessToken',
    });
  });

  it('should return 404 if user is not found', async () => {
    // Mock the userModel.findOne function to return null (user not found)
    userModel.findOne.mockResolvedValue(null);

    const req = { body: { email: 'nonexistent@example.com', password: 'password123' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Utilisateur introuvable' });
  });

  it('should return 400 if password is incorrect', async () => {
    // Mock the userModel.findOne function to return a user with valid email but incorrect password
    userModel.findOne.mockResolvedValue({
      email: 'test@example.com',
      password: await bcrypt.hash('password123', 10),
      role: { role_name: 'user' },
    });

    const req = { body: { email: 'test@example.com', password: 'wrongpassword' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Mot de passe incorrect' });
  });
});
