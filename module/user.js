const mongoose=require('mongoose');

const User=mongoose.model('user',{

    name:{type:String},
    email:{type:String},
    username:{type:String},
    password:{type:String},
    admin:{type:Number}


})

module.exports=User;