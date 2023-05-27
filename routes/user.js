const express=require('express');
const route=express.Router();
const bcrypt=require('bcrypt');
const User=require('../module/user');
route.use(express.json());

route.use(express.urlencoded({ extended: true }))
route.get('/',(req,res)=>{


    res.render('admin/register',{
        title:'Register'
    })
})

route.get('/login',(req,res)=>{


    res.render('admin/login',{
        title:'Login'
    })
})

route.post('/login',async(req,res)=>{

    try{
        let username=req.body.username;
        let result=await User.findOne({username:username});
        if(result)
        {
            if(bcrypt.compare(req.body.password,result.password))
            {
                return res.redirect('/');
            }
        }
        res.render("admin/login",{
            title:'username or password incorrect'
        })
    }catch(err)
    {
        res.send(err.message);
    }



})


route.post('/register',async(req,res)=>{

    try{
        console.log(req.body);
        const user=new User({
            username:req.body.username,
            
            email:req.body.email

        });
        console.log(user);
        let result=await User.findOne({username:user.username})
        if(result)
        {
           return res.render('admin/register',{
                title:"username already exist"
            })
        }
        let solt=await bcrypt.genSalt(2);
        let password=await bcrypt.hash(req.body.password,solt);
        user.password=password;
        await user.save();
        console.log(user);
        return res.redirect('/user/login');

    }catch(err)
    {
        res.send(err.message);
    }
  
})




route.get('/logout',async(req,res)=>{

    try{

    
        res.redirect('/user/login');
    }catch(err)
    {
        res.send(err.message);
    }


})

module.exports=route;