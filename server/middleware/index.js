const jwt = require("jsonwebtoken");
const { verifyAuthToken } = require("../utils/token");

// Middleware for logging request details
module.exports.logger = (req, res, next) => {
  console.log(`request method: ${req.method} request path: ${req.path}`);
  next();
};

// Middleware for user authentication
module.exports.authMiddleware = (req, res, next) => {
  try {
    // Extract the token from the "Authorization" header
    const token = req.headers.authorization.split(" ")[1];

    // Verify the authenticity of the token
    const payload = verifyAuthToken(token);
    if (!payload) {
      return res.status(401).json({
        message: "Invalid or expired token",
        success: false,
        data: null,
      });
    }

    // Attach user information to the request object
    req.user = { id: payload.id, email: payload.email, name: payload.name };

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // Clear the access token (if applicable)
    res.clearCookie("access_token");
    
    // Return a 401 (Unauthorized) response for invalid tokens
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};
