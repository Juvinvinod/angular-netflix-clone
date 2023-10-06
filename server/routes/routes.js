const express = require('express');
const router = express.Router();
const middleware = require ('../middleware/middleware');
const userController = require ('../controller/userController')
const multerUpload = require ('../utilities/multer')

router.post('/register',userController.registerUser);
router.post('/login',userController.login);
router.get('/',middleware.verifyToken,userController.home);
router.post("/image",middleware.verifyToken, multerUpload, userController.uploadImage)
router.post('/autoLogin/:token',userController.userData)
module.exports = router;