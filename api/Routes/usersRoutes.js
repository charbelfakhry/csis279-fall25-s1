const express = require("express");
const router = express.Router();
const authToken = require("../middleware/auth");

const {
  getUserByIdController,
  getAllUsersController,
  createUserController,
  updateUserController,
  deleteUserController,
  updateUserEmailController,//needs adding 
  authenticateUserController,//needs adding 
  refreshTokenController,//needs adding 
  updateUserBioController,//needs adding 
  changeUserPasswordController,//needs adding 
  resetPasswordController,//needs adding 
  confirmEmailController,//needs adding 
  searchUserByEmailController,//needs adding 
  searchUserByUsernameController,//needs adding 
  generateEmailConfirmationTokenController,//needs adding 
} = require("../controllers/userController");

const {
  insertUserValidation,
  updateUserValidation,
  updateUserEmailValidation,
  changeUserPasswordValidation,
  updateUserBioValidation
} = require('../Validators/users-validator');

//GET ROUTES

router.get("/user/:id", authToken, getUserByIdController);
router.get("/users", authToken, getAllUsersController);
router.get("/user/search/email", searchUserByEmailController);
router.get("/user/search/username", searchUserByUsernameController);

//POST ROUTES
router.post("/user", createUserController, insertUserValidation());
router.post("/auth/login", authenticateUserController);
router.post("/auth/refresh-token", refreshTokenController);
router.post("/user/reset-password", resetPasswordController);
router.post(
  "/user/confirmation-token/:userId",
  generateEmailConfirmationTokenController
);
router.post("/user/confirm-email", confirmEmailController);

//PUT ROUTES
router.put("/user/:id", authToken, updateUserController,
  updateUserValidation());
router.put("/user/changeEmail/:id", updateUserEmailController,
  updateUserEmailValidation());
router.put("/user/bio/:id", updateUserBioController,
  updateUserBioValidation());
router.put("/user/change-password/:id", changeUserPasswordController,
  changeUserPasswordValidation());

//DELTE ROUTES
router.delete("/user/:id", authToken, deleteUserController);

module.exports = router;
