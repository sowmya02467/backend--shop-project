
const mongoose = require('mongoose');


const cartNumberSchema = new mongoose.Schema({
   title : String,
 price:Number,
  image:String,
  quantity:Number,
  
}) 



const cartObjectSchema = new mongoose.Schema({
    items : {
        type: Map,
        of:cartNumberSchema,
    },
 }) ;

 const CartModel = mongoose.model('Cart',{

    items : {
        type:Map,
        of:cartObjectSchema,
    }
 })
 

 module.exports = CartModel;
