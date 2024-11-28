const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,'product name must be provided']
    },
    price:{
        type:Number,
        require:[true,'product price must be provided']
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type: Number,
        default: 4.5
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    company:{
        type:String,
        enum: {
            value: ['ikea','liddy','carresa','macos'],
            message: '{VALUE} is not supported'
        }
    }
})


module.exports = mongoose.model('Poduct',ProductSchema)