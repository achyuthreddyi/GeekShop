import path from 'path'
import express from 'express'
import  dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import connectDB from './config/db.js'
import {errorHandler, notFound} from './middleware/errorMiddleware.js'
import cors from 'cors'
//routers
import productRoutes from './routes/productRoute.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoute.js'


dotenv.config() 
connectDB()

const app = express()

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// middleware
app.use(cors())
app.use(express.json())


app.use('/api/products', productRoutes )

app.use('/api/users', userRoutes)

app.use('/api/orders', orderRoutes)

app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req,res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve() // not present by default if we use esmodule by default
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) =>res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
}else{
    app.get('/', (req, res) => {
        res.send('api is running')
    })
}

//FIXME: why are these two implemented SOLVED
app.use(notFound)

app.use(errorHandler)


const PORT = process.env.PORT || 5000 
app.listen(
    PORT, 
    console.log(`server running in ${process.env.NODE_ENV} on  ${PORT}`.yellow.bold)
)