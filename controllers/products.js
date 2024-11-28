const getAllstatic = (req,res) => {
    throw new Error('testing async error')
    res.status(200).json({msg: 'product static'})
}


const getAllProducts = (req,res) => {
    res.status(200).json({msg: 'product route'})
}


module.exports = {
    getAllstatic,
    getAllProducts,
}