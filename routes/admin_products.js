const express=require('express');
const route=express.Router();
route.use(express.json());
const flash=require('connect-flash')
route.use(flash());
route.use(express.urlencoded({ extended: true }))
const product=require('../module/product');
const mkdirp=require('mkdirp');
const categories=require('../module/category');
const multer=require('multer');

let filename="";

const mystorage=multer.diskStorage({

    destination:'./public',
    filename:(req,file,redirect)=>{

        let f1=file;
        redirect(null,f1);
        filename=f1;
    }


});


//middel ware upload image
const upload=multer({storage:mystorage});


//get all categories for render admin/product


route.get('/',async(req,res)=>{
    
    var count;
    count =await product.count();
    result=await product.find({});
    res.render('admin/product',{
        products:result,
        count:count,
        val:null
    })

});


route.get('/add-product',async(req,res)=>{

    messages=""
    try{
        let aux=await categories.find({});
        
        res.render('admin/add_product',{
            message:messages,
            cat : aux,
            val:null
        })
    }catch(err)
    {
        res.send(err.message);
    }
    
   

})




route.post('/add-product',upload.any(),async(req,res)=>{
   
   try{
    
    let aux=await categories.find({});
    console.log(req.body);
    console.log(filename);
    let result=await product.findOne({title:req.body.title});
    
    if(result)
        
       return res.render('admin/add_product',{
            message:"title already exist",
            cat:aux,
            val:null
        })
     let pr=new product({
        title:req.body.title,
        slug:req.body.slug,
        desc:req.body.desc,
        price:req.body.price,
        category:req.body.category,
        image:filename,
        sorting:req.body.sorting
     })   
     await pr.save();
     filename='';
     return  res.render('admin/add_product',{
        message:"succes",
            cat:aux,
            val:null
     })

}catch(err)
   {
    res.send(err.message);
   }

})

route.get('/edit-product/:id',async(req,res)=>{

try{
    let result=await product.findOne({content:req.params._id})
    let aux=await categories.find({});
    
       return  res.render('admin/edit_product',{
        message:"",
        cat:aux,
        val:result
            
        });
    }catch(err)
    {
        res.send(err.message);
    }



})



route.post('/edit-product/:id',async(req,res)=>{
    try{

        let result=await pages.findOne({content:req.params.slug});
        result.title=req.body.title;
        result.content=req.body.content;
        result.sorting=req.body.sorting;
        await result.save();
        res.redirect('/admin/pages');

    }catch(err)
    {
        res.send(err.message);
    }



})


route.get('/delete-product/:id',async(req,res)=>{

    
   try{
    let result=await  product.findByIdAndRemove(req.params.id);
    
    var count;
    count =await product.count();
    result=await product.find({});
    return res.render('admin/product',{
        products:result,
        count:count

    })
    
    
   }catch(err)
   {
    res.send(err.message);
   }

})


module.exports=route;
