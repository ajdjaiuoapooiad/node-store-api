const Product = require('../models/product')


const getAllstatic = async (req,res) => {
    const products = await Product.find({})
        .sort('name price')
        .select('name price')
 
    res.status(200).json({products,nbHits: products.length})
}


const getAllProducts = async (req,res) => {
    const {featured,company,name,sort,fields} = req.query
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

    let result = Product.find(queryObjects)
    if(sort){
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList)
    }else{
        result = result.sort('createdAt')
    }

    if(fields){
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit 

    result = result.skip(skip).limit(limit)



    console.log(queryObjects);
    const products = await result
    res.status(200).json({products,nbHits: products.length})
}


module.exports = {
    getAllstatic,
    getAllProducts,
}