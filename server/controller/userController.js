const mongoose = require ('mongoose');

const User = require ('../model/User.js');

const registerUser = async (req,res) =>{
    try {
        userData = req.body
        let user = new User(userData);
        await user.save();
         res.status(200).send(user);   
    } catch (error) {
        console.log(error);
    }
}

const login = async(req,res) =>{
    try {
        let userData = req.body;
        const document = await User.findOne({email: userData.email});
        if (document){
            res.status(200).send(document);
        }else{
            res.status(401).send("Invalid user/password");
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports ={
    registerUser,
    login,
}