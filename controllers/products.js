const getAllstatic = (req,res) => {
    res.status(200).json({msg: 'product static'})
}


const getAllProducts = (req,res) => {
    res.status(200).json({msg: 'product route'})
}


module.exports = {
    getAllstatic,
    getAllProducts,
}