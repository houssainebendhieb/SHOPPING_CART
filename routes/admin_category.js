const express=require('express');

const route=express.Router();

const Category=require('../module/category');


const bodyParser=require('body-parser');
route.use(bodyParser.json());
route.use(bodyParser.urlencoded());




const flash=require('connect-flash')
route.use(flash());


route.get('/',async(req,res)=>{
try{
    let result=await Category.find({});
    if(result)
    {
        return res.render('admin/categories',{
            categories:result,
            message:""

        })
    }

}catch(err)
{
    res.send(err.message);
}

})

route.get('/add-categories',async(req,res)=>{

    try{
        res.render('admin/add_categories',{

            message:" "
        });

    }catch(err)
    {
        res.send(err.message);
    }




})
route.post('/add-categories',bodyParser.urlencoded(),async(req,res)=>{
    try{
        
        let result=new Category(req.body);
        
        let aux=await result.save();
        await Category.find({}).then((c)=>{
            app.locals.cats=c;
          }).catch((err)=>{
            console.log(err.message);
          })
        return  res.render('admin/add_categories',{

            message:"succes"
        });

    }catch(err)
    {
        res.render('admin/add_categories',{

            message:err.message
        });
    }


});





route.get('/edit-categories/:id',async(req,res)=>{

    let result=await Category.findOne({_id:req.params.id});
    res.render('admin/edit_categories',{
        id:result._id,
        title:result.title,
        slug:result.slug,
        message:"succes"
    });
    


})

route.post('/edit-categories/:id',async(req,res)=>{

    let result=await Category.findOne({_id:req.params.id});
    result.title=req.body.title;
    result.slug=req.body.slug;
    await result.save();
    await Category.find({}).then((c)=>{
        app.locals.cats=c;
      }).catch((err)=>{
        console.log(err.message);
      })
      
      
    res.render('admin/edit_categories',{
        id:result._id,
        title:result.title,
        slug:result.slug,
        message:"succes"
    });
    


})

route.get('/delete-categories/:id',async(req,res)=>{

    let result=await Category.findOneAndDelete({_id:req.params.id});
    await Category.find({}).then((c)=>{
        app.locals.cats=c;
      }).catch((err)=>{
        console.log(err.message);
      })
    res.redirect('/admin/categories');


})



module.exports=route;