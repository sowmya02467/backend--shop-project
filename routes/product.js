const express   = require("express")

 const ProductModel = require('../models/product')



const product = express.Router()

product.get("/:user_id", async(req,res)=>{
    try{
        const id = req.params.user_id
        const query = {
            [`items.${id}`]: { $exists: true }
        }
        const isPresent = await ProductModel.findOne(query)
        res.send(isPresent)
    }
    catch(error){
        console.log(error.message)
    }
})

product.post('/add', async(req,res)=>{
    try{
        const desiredKey = Object.keys(req.body)[0];
        const query = {
            [`items.${desiredKey}`]: { $exists: true }
        }
        const isPresent = await ProductModel.findOne(query)
        if(isPresent){
            await ProductModel.findOneAndReplace(query,{ items: req.body })
        }else{
            const newProduct = new ProductModel({ items: req.body });
            newProduct.save()
            .then((result) => {
                console.log('Product saved to the database:', result);
                res.send({message:"Product added to the database"})
            })
            .catch((error) => {
                console.error('Error saving cart to the database:', error);
            });
        }
    }catch(error){
        console.log(error.message)
    }
})

product.delete('/delete/:user_id', async(req,res)=>{
    try{
        const desiredKey = req.params.user_id;
        const query = {
            [`items.${desiredKey}`]: { $exists: true }
        }
        //console.log(desiredKey)
        await ProductModel.findOneAndDelete(query)
    }catch(error){
        console.log(error.message)
    }
})

module.exports = product