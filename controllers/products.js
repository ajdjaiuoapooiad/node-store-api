const Product = require('../models/product')


const getAllstatic = async (req,res) => {
    const products = await Product.find({
        name:'vase table'
    })
    res.status(200).json({products,nbHits: products.length})
}


const getAllProducts = async (req,res) => {
    const {featured} = req.query
    const queryObjects = {}

    if(featured){
        queryObjects.featured = featured === 'true'? true: false
    }

    console.log(queryObjects);
    const products = await Product.find(queryObjects)
    res.status(200).json({products,nbHits: products.length})
}


module.exports = {
    getAllstatic,
    getAllProducts,
}