

const mongoose = require('mongoose');


const productsNumberSchema = new mongoose.Schema({
   title : String,
   description:String,
   price:Number,
   discount: Number,
   category:String,
   imgurl:String,
  
}) 



const productObjectSchema = new mongoose.Schema({
    items : {
        type: Map,
        of:productsNumberSchema,
    },
 }) ;

 const ProductModel = mongoose.model('Product',{

    items : {
        type:Map,
        of:productObjectSchema,
    }
 })
 

 module.exports = ProductModel;
