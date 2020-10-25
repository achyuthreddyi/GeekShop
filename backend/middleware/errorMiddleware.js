const notFound = (err, req, res, next) =>{
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}


const errorHandler = (req, res, next) =>{
    const error = new Error(`Not Found = ${req.originalUrl}`)
    res.status(404)
    next(error)
}

export {notFound, errorHandler}