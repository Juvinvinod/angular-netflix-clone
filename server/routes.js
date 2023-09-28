const express = require('express');
const router = express.Router();
const middleware = require ('./middleware/middleware');
const userController = require ('./controller/userController')

router.post('/register',userController.registerUser);
router.post('/login',userController.login);
router.get('/',middleware.verifyToken,userController.home);

module.exports = router;