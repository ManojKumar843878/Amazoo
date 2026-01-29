const productModel = require('../Models/productModel');

// bunch of products - /api/v1/products
exports.getProducts = async (req, res, next) => {
    
    const querys =req.query.keyword?{name: {
        $regex:req.query.keyword,
        $options:'i'
    }}:{}

    const products = await productModel.find(querys)
    res.json({
        success: true,
        products
    })
}

//single product - /api/v1/product/:id
exports.getProduct = async (req, res, next) => {
  try {
       const product = await productModel.findById(req.params.id)

        res.json({
            success: true,
            product
        })
    }
  catch (error) {
        res.status(404).json({
            success: false,
            message:'no product in this id'

        })

    }
}
