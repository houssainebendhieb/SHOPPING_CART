const express=require('express');
const route=express.Router();
route.use(express.json());
const flash=require('connect-flash')
route.use(flash());
route.use(express.urlencoded({ extended: true }))
const product=require('../module/product');
const categories=require('../module/category');
route.get('/',async(req,res)=>{

    try{
        let result2=await categories.find({});
        let result=await product.find({});
       return  res.render('admin/all_products',{
            cats:result2,
            products:result

        })


    }catch(err)
    {
        res.send('error message');
    }
});



route.get('/:id',async(req,res)=>{

    
    try{
        let result2=await categories.find({});
        console.log(req.params.id);
        let result=await product.find({category:req.params.id});
       console.log(result);
        return  res.render('admin/all_products',{
            cats:result2,
            products:result
        })


    }catch(err)
    {
        res.send(err.message);
    }
});



module.exports=route;
