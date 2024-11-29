const Product = require('../models/product')


const getAllstatic = async (req,res) => {
    const products = await Product.find({}).sort('name price')
    res.status(200).json({products,nbHits: products.length})
}


const getAllProducts = async (req,res) => {
    const {featured,company,name} = req.query
    const queryObjects = {}

    if(featured){
        queryObjects.featured = featured === 'true'? true: false
    }
    if(company){
        queryObjects.company = company 
    }
    if(name){
        queryObjects.name = {$regex: name, $options: 'i'}
    }

    console.log(queryObjects);
    const products = await Product.find(queryObjects)
    res.status(200).json({products,nbHits: products.length})
}


module.exports = {
    getAllstatic,
    getAllProducts,
}