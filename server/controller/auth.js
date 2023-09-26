const { User } = require("../schema/UserSchema");
const { comparePassword } = require("../utils/auth.utils");
const { generateToken } = require("../utils/token");
const { verifyAuthToken } = require("../utils/token");

// API endpoint for user signup
module.exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if a user with the given email already exists
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({
        message: "User with this email already exists",
        success: false,
        data: null,
      });
    }

    // Create a new user
    await User.create({
      name,
      email,
      password,
    });

    // Fetch the created user and generate a token for them
    const user = await User.findOne({ email });
    const token = generateToken({
      id: user._id,
      email: user.email,
      name: user.name,
    });

    return res.status(201).json({
      message: "Signup successful",
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      success: false,
      data: null,
    });
  }
};

// API endpoint for user login
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user with the provided email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User with this email does not exist",
        success: false,
        data: null,
      });
    }

    // Compare the provided password with the stored password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials",
        success: false,
        data: null,
      });
    }

    // Generate a token for the authenticated user
    const token = generateToken({
      id: user._id,
      email: user.email,
      name: user.name,
    });

    return res.status(201).json({
      message: "Login successful",
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      success: false,
      data: null,
    });
  }
};

// API endpoint for validating user tokens
module.exports.validate = async (req, res) => {
  try {
    const { token } = req.params;

    // Verify the authenticity of the provided token
    const payload = verifyAuthToken(token);
    if (!payload) {
      return res.status(401).json({
        message: "Invalid or expired token",
        success: false,
        data: null,
      });
    }

    return res.status(200).json({
      message: "User Verified",
      success: true,
      data: { token, user: payload },
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      message: error.message,
      success: false,
      data: null,
    });
  }
};
