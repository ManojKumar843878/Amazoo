const mongoose =require('mongoose');

const ProductSchema =new mongoose.Schema({
       name:String,
       price:Number,
       description:String,
       ratings:String,
       images:[
        {
            image:String
        }
       ],
         catogry:String,
         seller:String,
         stock:Number,
         numofViews:String,
         createdAt:Date
});


const productModel =mongoose.model('Product',ProductSchema)

module.exports=productModel;


