const router = require("express").Router();

const adminController = require('../controller/adminController')

router.get("/users",adminController.getAllUser);
router.get("/user/:id",adminController.getUser)
router.post("/edit",adminController.editUser);
router.delete("/delete/:id",adminController.deleteUser);
router.get("/email",adminController.deleteUser);


module.exports = router