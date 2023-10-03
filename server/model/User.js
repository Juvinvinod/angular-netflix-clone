const mongoose = require ('mongoose');

const {Schema} = mongoose

const userSchema =  new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"user"
    },
    profileImage:{
        profileImage: {
            type: String,
            default: "person.jpeg"
        }
    }
})

module.exports = mongoose.model('User',userSchema);