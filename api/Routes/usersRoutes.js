const express = require('express');
const router = express.Router();

const {
    registerUserController,
    getUserByIdController,
    findAllUsersController,
    updateUserController,
    deleteUserController,
    updateUserEmailController,
    authenticateUserController,
    refreshTokenController,
    updateUserBioController,
    changeUserPasswordController,
    resetPasswordController,
    confirmEmailController,
    searchUserByEmailController,
    searchUserByUsernameController,
    generateEmailConfirmationTokenController,
} = require('../controllers/usersController');

//GET ROUTES

router.get('/user/:id', getUserByIdController);
router.get('/users', findAllUsersController);
router.get('/user/search/email', searchUserByEmailController); 
router.get('/user/search/username', searchUserByUsernameController);

//POST ROUTES
router.post('/user',registerUserController);
router.post('/auth/login', authenticateUserController); 
router.post('/auth/refresh-token', refreshTokenController);
router.post('/user/reset-password', resetPasswordController);
router.post('/user/confirmation-token/:userId', generateEmailConfirmationTokenController);
router.post('/user/confirm-email', confirmEmailController);

//PUT ROUTES
router.put('/user/:id', updateUserController);
router.put('/user/changeEmail/:id', updateUserEmailController);
router.put('/user/bio/:id', updateUserBioController);
router.put('/user/change-password/:id', changeUserPasswordController);

//DELTE ROUTES
router.delete('/user/:id', deleteUserController);


