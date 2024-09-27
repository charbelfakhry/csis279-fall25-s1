const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenicateToken = (req, res, next) => {
  const authHeader = req.header("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401).json({ message: "Token not found" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    console.error("Error verifying token", err);
    res.sendStatus(403).json({ message: "invalid token" });
  }
};

module.exports = authenicateToken;
