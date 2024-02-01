const express   = require("express")

 const  PurchaseModel  = require('../models/purchase.js')




const purchase = express.Router()

purchase.get("/:user_id", async(req,res)=>{
    try{
        const id = req.params.user_id
        const query = {
            [`items.${id}`]: { $exists: true }
        }
        const isPresent = await PurchaseModel.findOne(query)
        res.send(isPresent)
    }
    catch(error){
        console.log(error.message)
    }
})

purchase.post('/add', async(req,res)=>{
    try{
        const desiredKey = Object.keys(req.body)[0];
        const query = {
            [`items.${desiredKey}`]: { $exists: true }
        }
        const isPresent = await PurchaseModel.findOne(query)
        if(isPresent){
            await PurchaseModel.findOneAndReplace(query,{ items: req.body })
        }else{
            const newPurchase = new PurchaseModel({ items: req.body });
            newPurchase.save()
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

module.exports = purchase