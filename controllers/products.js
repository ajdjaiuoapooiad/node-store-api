const Product = require('../models/product')


const getAllstatic = async (req,res) => {
    const products = await Product.find({
        name:'vase table'
    })
    res.status(200).json({products,nbHits: products.length})
}


const getAllProducts = (req,res) => {
    res.status(200).json({msg: 'product route'})
}


module.exports = {
    getAllstatic,
    getAllProducts,
}