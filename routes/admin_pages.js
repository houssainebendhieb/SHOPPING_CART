const express=require('express');
const route=express.Router();
route.use(express.json());
const flash=require('connect-flash')
route.use(flash());
route.use(express.urlencoded({ extended: true }))
const pages=require('../module/pages');
route.get('/',(req,res)=>{
    pages.find({}).sort({sorting:1}).exec().then(Page=>{

        res.render('admin/pages',{
            Page:Page
        });

    });
});


route.get('/add-pages',(req,res)=>{
    
    res.render('admin/add_pages',{message:""});

})




route.post('/add-pages',async(req,res)=>{
   
   try{
   
    let result=await pages.findOne({title:req.body.title});
    const user=new pages(req.body);
    let message="";
    if(result){
        
        
        console.log('error')
       return  res.render('admin/add_pages',{message:"title already exist please try new one " });
    }
    
    message=req.flash('message','succes');
    result=await user.save();
    
    
    return res.render('admin/add_pages',{message:"succes marhba bik " });
    }catch(err)
    {
        return res.render('admin/add_pages',{message: err.message });
    }

})

route.get('/edit-page/:slug',async(req,res)=>{

try{
    let result=await pages.findOne({content:req.params.slug})
    if(result)
    {
       return  res.render('admin/edit_pages',{
            title:result.title,
            content:result.content,
            sorting:result.sorting,
            id:result._id
        });
    }
    return res.render('admin/pages');
}catch(err)
{

}


})



route.post('/edit-pages/:slug',async(req,res)=>{
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


route.get('/delete-page/:id',async(req,res)=>{

   try{
    let result=await  pages.findByIdAndRemove(req.params.id);
    if(!result)
    {
        return  res.render('admin/pages');
    }
    res.redirect('/admin/pages/');
   }catch(err)
   {
    res.send(err.message);
   }

})


module.exports=route;
