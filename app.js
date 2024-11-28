require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')
const connectDB = require('./db/connect')
const productRouter = require('./routes/products')

app.use(express.json())


app.get('/',(req,res) => {
    res.send('<h1>Store Api</h1><a href="/api/v1/products/">product route</a>')
})

app.use('/api/v1/products',productRouter)


app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 3000;

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is running .... port: ${port}`)
        )
    }catch(error){
        console.log(error);
        
    }
}

start()
