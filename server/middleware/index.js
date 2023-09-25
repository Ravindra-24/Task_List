const jwt = require("jsonwebtoken");
const { verifyAuthToken } = require("../utils/token");

// const SECRET_KEY = process.env.SECRET_KEY;

module.exports.loger = (req, res, next) => {
  console.log(`request method:${req.method} request path:${req.path}`);
  next();
};

module.exports.authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const payload = verifyAuthToken(token);
    if (!payload) {
      return res.status(401).json({
        message: "Invalid or expired token",
        success: false,
        data: null,
      });
    }
    req.user = { id: payload.id, email: payload.email, name: payload.name };
    next()
  } catch (error) {
    res.clearCookie("access_token");
    return res.status(401).json({
      message: "invalid token",
    });
  }
};