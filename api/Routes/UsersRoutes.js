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

router.get("/user/:id", authToken, getUserByIdController); // Tested
router.get("/users", getAllUsersController); // Tested
// router.get("/user/search/email", searchUserByEmailController);
// router.get("/user/search/username", searchUserByUsernameController);

//POST ROUTES
router.post("/user", createUserController, insertUserValidation); //Tested
router.post("/auth/login", authenticateUserController); // Tested
// router.post("/auth/refresh-token", refreshTokenController);
// router.post("/user/reset-password", resetPasswordController);
// router.post(
//   "/user/confirmation-token/:userId",
//   generateEmailConfirmationTokenController
// );
// router.post("/user/confirm-email", confirmEmailController);

//PUT ROUTES
router.put("/user", authToken, updateUserController, updateUserValidation); //Tested
// router.put("/user/changeEmail/:id", updateUserEmailController,
//   updateUserEmailValidation());
// router.put("/user/bio/:id", updateUserBioController,
//   updateUserBioValidation());
// router.put("/user/change-password/:id", changeUserPasswordController,
//   changeUserPasswordValidation());

//DELTE ROUTES
router.delete("/user/:id", deleteUserController); //removed auth for testing

module.exports = router;
