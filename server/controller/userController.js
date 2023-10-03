const mongoose = require ('mongoose');
const jwt = require ('jsonwebtoken')
require('dotenv').config({ path: '.env' });

const User = require ('../model/User.js');

const registerUser = async (req,res) =>{
    try {
        userData = req.body
        let user = new User(userData);
        await user.save();
        let payload = {subject: user._id};
        let token = jwt.sign(payload,process.env.JWTSECRET)
         res.status(200).send({token});   
    } catch (error) {
        console.log(error);
    }
}

const login = async(req,res) =>{
    try {
        let userData = req.body;
        const document = await User.findOne({email: userData.email});
        if (document){
            let payload = { subject: document._id };
            let token = jwt.sign(payload,process.env.JWTSECRET)
            res.status(200).send({token});
        }else{
            res.status(401).send("Invalid user/password");
        }
    } catch (error) {
        console.log(error);
    }
}

const home = async(req,res)=>{
    const id = req.userId;
    const document = await User.find({_id:id});
    return res.status(200).send(document);
}

const uploadImage = async (req, res)=>{
    try {

        const {id} = req.body

        const imageFile = req.file.filename

        await userModel.findByIdAndUpdate(id,{profileImage: imageFile})

        res.sendStatus(200);

    } catch (error) {
        console.log(error)
    }
}

module.exports ={
    registerUser,
    login,
    home,
    uploadImage,
}