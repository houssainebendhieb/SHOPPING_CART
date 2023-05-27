const express=require('express');
const route=express.Router();
route.use(express.json());
const flash=require('connect-flash')
route.use(flash());
route.use(express.urlencoded({ extended: true }))
const product=require('../module/product');


route.get('/add/:product',async(req,res)=>{

    var slug=req.params.product;
    try{
       let result= await product.findOne({title:slug})
        if(typeof req.session.cart=="undefined")
        {
            req.session.cart={};
            req.session.cart.push({
                title:slug,
                qty:1,
                price:parseFloat(result.price).toFixed(2)

            })
        }
        else{
            var cart=req.session.cart;
            var newItemtes=true;
            for(var i=0;i<cart.length;i++)
            {
                if(cart[i].title==slug)
                {
                    cart[i].qty++;
                    newItemtes=false;
                    break;
                }
            }
            if(newItemtes){
                cart.push({

                    title:slug,
                    qty:1,
                    price:parseFloat(result.price).toFixes(2),
                    image:" "

                })


            }
        }


    }catch(err)
    {
        res.send(err.message);
    }


})



module.exports=route;
