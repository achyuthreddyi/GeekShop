import express from 'express'
import  dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import {errorHandler, notFound} from './middleware/errorMiddleware.js'
import cors from 'cors'
//routers
import productRoutes from './routes/productRoute.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config() 
connectDB()

const app = express()

// middleware
app.use(cors())
app.use(express.json())

app.get('/', (req, res) =>{
    res.send('api is running')
})

app.use('/api/products', productRoutes )

app.use('/api/users', userRoutes)

//FIXME: why are these two implemented SOLVED
app.use(notFound)

app.use(errorHandler)


const PORT = process.env.PORT || 5000 
app.listen(
    PORT, 
    console.log(`server running in ${process.env.NODE_ENV} on  ${PORT}`.yellow.bold)
)