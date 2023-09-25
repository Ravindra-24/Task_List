const {Router} =require('express');
const { signup, login, validate } = require('../controller/auth');
const router = Router();

router.post('/signup',signup)

router.post('/login',login)

router.get("/validate/:token", validate)

module.exports = router;