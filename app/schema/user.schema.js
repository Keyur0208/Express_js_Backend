var mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim: true,
    },
    email:{
        type:String,
        trim: true,
        require:true
    },
    password:{
        type:String,
        trim: true,
        require:true
    },
    created_at: { 
        type: Date,
        default: Date.now 
    },
    updated_at: Date,
    isActive:{
        type:Boolean, 
        default:true
    },
    isDeleted:{
        type: Boolean,
        default:false
    }
})


const userModel = new mongoose.model("user",user_schema);

module.exports = userModel;
