const Product = require('../models/product')


const getAllstatic = async (req,res) => {
    const products = await Product.find({price: {$gt: 30}})
        .sort('price')
        .select('name price')
 
    res.status(200).json({products,nbHits: products.length})
}


const getAllProducts = async (req,res) => {
    const {featured,company,name,sort,fields,numericFilters} = req.query
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

    if(numericFilters){
        const oparatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx,
            (match) => `-${oparatorMap[match]}-`)
        const options = ['price','rating']
        filters = filters.split(',').forEach((item) => {
            const [field,operator,value] = item.split('-')
            if(options.includes(field)){
                queryObjects[field] =  {[operator]: Number(value)}
            }
        })
        console.log(filters);
        
        
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