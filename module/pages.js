const mongoose=require('mongoose');

const pages=mongoose.model('pages',{

    title:{type:String,required:true},
    content:{type:String,required:true},
    sorting:{type:Number}



})

module.exports=pages;