

const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Roll_no:{
        type:String,
        required:true
    },
    Class:{
        type:String,
        required:true
    }
   
})

const User = new mongoose.model('user',uploadSchema);
module.exports=User;