const mongoose=require('mongoose');


const Product=mongoose.model('products',{

    title:{
        type:String,
        required:true
    },
    category:{
        type:String
    },

    slug:{
        type:String
    },
    desc:{
        type:String,
        required:true

    },

    sorting:{
        type:Number
    },
    price:{
        type:Number,
        required:true
    },
    image:{
       type: String
    }

})

module.exports=Product;