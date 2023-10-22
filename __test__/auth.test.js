const {
    register,
    login,
} = require('../controllers/auth.controller');


jest.mock('../models/users'); 
jest.mock('../models/role.model'); 
jest.mock('bcrypt');


describe('Auth Controller Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    
    describe('register function', () => {
        




    });

    
    describe('login function', () => {





    });
});
