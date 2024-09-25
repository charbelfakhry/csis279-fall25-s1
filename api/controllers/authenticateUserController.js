const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/users");
require("dotenv").config();

const authenticateUserController = async (req, res) => {
  const { email, pass } = req.body;

  try {
    const user = await User.findOne({ where: { user_email: email } });
    if (!user) {
      return res.status(404).json({ message: "invalid email or pass" });
    }
    const validPass = await bcrypt.compare(pass, user.pass);
    if (!validPass) {
      return res.status(404).json({ message: "invalid email or pass" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.user_email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.status(200).json({ token });
  } catch(error) {
    console.error("Error authenticating user", error);
    return res.status(500).json({ message: "server error" });
  }
};

module.exports = authenticateUserController;
