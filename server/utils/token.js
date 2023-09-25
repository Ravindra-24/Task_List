const jwt = require("jsonwebtoken");

module.exports.verifyAuthToken = (token) => {
  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    return payload;
  } catch (error) {
    return false;
  }
};

module.exports.generateToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });
};

// export const generateResetToken = (payload) => {
//   return jwt.sign(payload, process.env.SECRET_KEY, {
//     expiresIn: "5m",
//   });
// };

// export const verifyResetToken = (token) => {
//   try {
//     const payload = jwt.verify(token, process.env.SECRET_KEY);
//     return payload;
//   } catch (error) {
//     return null;
//   }
// };