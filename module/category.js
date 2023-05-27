const mongoose=require('mongoose');


const Category=mongoose.model('CAtegory',{

    title:{
        type:String,required:true
    },
    slug:{
        type:String
    }


});



module.exports=Category;