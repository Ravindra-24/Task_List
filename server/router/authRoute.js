const { Router } = require('express');
const { signup, login, validate } = require('../controller/auth');
const router = Router();

// Route for user signup
router.post('/signup', signup);

// Route for user login
router.post('/login', login);

// Route for validating user tokens
router.get("/validate/:token", validate);

module.exports = router;
