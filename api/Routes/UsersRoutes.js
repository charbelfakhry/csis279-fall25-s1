const express = require("express");
const router = express.Router();
const authToken = require("../Middleware/AuthToken");

const authenticateUserController = require("../Controllers/UserAuthController");

const {
  getUserByIdController,
  getAllUsersController,
  createUserController,
  updateUserController,
  deleteUserController,
  // updateUserEmailController,//needs adding
  // refreshTokenController,//needs adding
  // updateUserBioController,//needs adding
  // changeUserPasswordController,//needs adding
  // resetPasswordController,//needs adding
  // confirmEmailController,//needs adding
  // searchUserByEmailController,//needs adding
  // searchUserByUsernameController,//needs adding
  // generateEmailConfirmationTokenController,//needs adding
} = require("../Controllers/UsersController");

const {
  insertUserValidation,
  updateUserValidation,
  updateUserEmailValidation,
  changeUserPasswordValidation,
  updateUserBioValidation,
} = require("../Validators/UserValidator");

//GET ROUTES
router.get("/:id", authToken, getUserByIdController); // Tested
router.get("/", authToken, getAllUsersController); // Tested


//POST ROUTES
router.post("/" ,createUserController, insertUserValidation); //Tested
router.post("/auth/login", authenticateUserController); // Tested


//PUT ROUTES
router.put("/", authToken, updateUserController, updateUserValidation); //Tested

//DELTE ROUTES
router.delete("/:id", authToken , deleteUserController); 

module.exports = router;
