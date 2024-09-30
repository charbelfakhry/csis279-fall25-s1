const express = require("express");
const router = express.Router();
const authToken = require("../middleware/auth");

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
} = require("../controllers/usersController");

const {
  insertUserValidation,
  updateUserValidation,
  updateUserEmailValidation,
  changeUserPasswordValidation,
  updateUserBioValidation
} = require('../Validators/users-validator');

//GET ROUTES

router.get("/user/:id", authToken, getUserByIdController);
router.get("/users", authToken, findAllUsersController);
router.get("/user/search/email", searchUserByEmailController);
router.get("/user/search/username", searchUserByUsernameController);

//POST ROUTES
router.post("/user", registerUserController, insertUserValidation());
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
