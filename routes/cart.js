 const express   = require("express")

 const  CartModel = require('../models/cart.js')




const Cart = express.Router()

Cart.get("/:user_id", async(req,res)=>{
    try{
        const id = req.params.user_id
        const query = {
            [`items.${id}`]: { $exists: true }
        }
        const isPresent = await CartModel.findOne(query)
        res.send(isPresent)
    }
    catch(error){
        console.log(error.message)
    }
})

Cart.post('/add', async(req,res)=>{
    try{
        const desiredKey = Object.keys(req.body)[0];
        const query = {
            [`items.${desiredKey}`]: { $exists: true }
        }
        const isPresent = await CartModel.findOne(query)
        if(isPresent){
            await CartModel.findOneAndReplace(query,{ items: req.body })
        }else{
            const newCart = new CartModel({ items: req.body });
            newCart.save()
            .then((result) => {
                //console.log('Cart saved to the database:', result);
                res.send({message:"Item added to the Cart"})
            })
            .catch((error) => {
                console.error('Error saving cart to the database:', error);
            });
        }
    }catch(error){
        console.log(error.message)
    }
})

Cart.delete('/delete/:user_id', async(req,res)=>{
    try{
        const desiredKey = req.params.user_id;
        const query = {
            [`items.${desiredKey}`]: { $exists: true }
        }
        //console.log(desiredKey)
        await CartModel.findOneAndDelete(query)
    }catch(error){
        console.log(error.message)
    }
})


module.exports = Cart