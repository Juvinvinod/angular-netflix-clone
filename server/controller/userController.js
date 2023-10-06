const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: '.env' });

const User = require('../model/User.js');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userData = await User.findOne({ name: name })

        if (userData) {
            res.status(400).json({ message: "This username already Exists" });
            return
        }

        const newUser = User({
            name,
            email,
            password
        })

        await newUser.save()

        res.status(200).json({ message: "Account created successfully" })

    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    try {
        let userData = req.body;
        const document = await User.findOne({ email: userData.email });
        if (!document) {
            res.status(400).send("Invalid user/password")
            return
        }
        if (document.password !== userData.password) {
            res.status(400).json("Invalid user/password")
            return
        }
        let role = document.role;
        let payload = { subject: document._id };
        let token = jwt.sign(payload, process.env.JWTSECRET)
        res.status(200).send({ token,role });
    } catch (error) {
        console.log(error);
    }
}

const home = async (req, res) => {
    const id = req.userId;
    const document = await User.find({ _id: id });
    return res.status(200).send(document);
}

const uploadImage = async (req, res) => {
    try {

        const  id  = req.userId;
        // const imageFile = req.file.thumbnail

        await User.findByIdAndUpdate(id, { profileImage: imageFile })

        res.sendStatus(200);

    } catch (error) {
        console.log(error)
    }
}

const userData = (req, res) => {
    const token = req.params.token;
    jwt.verify(token, process.env.JWTSECRET, (err, user) => {
        userId = user.subject;
    })

}

module.exports = {
    registerUser,
    login,
    home,
    uploadImage,
    userData,
}