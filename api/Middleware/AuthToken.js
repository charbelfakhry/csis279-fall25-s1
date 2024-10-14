const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenicateToken = (req, res, next) => {
  const authHeader = req.header("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({status: 401, message: "Unauthorized" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    console.error("Error verifying token", err);
    res.status(403).json({ message: "invalid token" });
  }
};

module.exports = authenicateToken;
