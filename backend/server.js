const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const startDB = require('./helpers/startDatabase')
const userRouter = require('./routes/userRoutes')
const cartRouter = require('./routes/cartRoutes')

app.use(express.json())
app.use(cors({
    origin:'*'
}))
dotenv.config()

app.use('/api/v1/u',userRouter)
app.use('/api/v1/cart',cartRouter)

const PORT = '5001'
const startServer=async()=>{
    await startDB()
    app.listen(5001,()=>console.log(`server is listening at ${PORT}`))
}


startServer()