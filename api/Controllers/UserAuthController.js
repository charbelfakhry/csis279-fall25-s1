const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Models/User");
require("dotenv").config();

const userAuthController = async (req, res) => {
  const { email, pass } = req.body;

  console.log(email, pass);

  if(!email || !pass) {
    return res.status(400).json({ message: "missing email or pass" });
  }

  try {
    const user = await User.findOne({ where: { user_email: email } });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "invalid email or pass" });
    }
    const validPass = await bcrypt.compare(pass, user.user_pass);//salted pass
    if (!validPass) {
      return res.status(404).json({ message: "invalid email or pass" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.user_email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.status(200).json({ token, user });
  } catch(error) {
    console.error("Error authenticating user", error);
    return res.status(500).json({ message: "server error" });
  }
};

module.exports = userAuthController;
