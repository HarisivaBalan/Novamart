const ErrorHandler = require("../utils/errorHandler");

module.exports = (err,req,res,next) =>{
    err.statusCode = err.statusCode || 500;
    if(process.env.NODE_ENV == 'development')
    {

    
    res.status(err.statusCode).json({
            success:false,
            message:err.message,
            stack :err.stack,
            error:err
    })
}
if(process.env.NODE_ENV == 'production'){
    let message=err.message;
    let error=new ErrorHandler(message, 400)
    if(err.name =="ValidationError")
    {
        message = Object.values(err.errors).map(value=>value.message)
        error =new ErrorHandler(message, 400);
        err.statusCode=400;
    }
    // if(err.name== "CastError")
    //     {
    //         message=`Resource Not Found ${err.path}`;
    //         //return next(new Error(message,400));
    //         error =new ErrorHandler(message, 400);


    //     }
        if (err.name === 'CastError') {
            message = `Resource not found: Invalid ${err.path}`;
            error = new ErrorHandler(message, 400);
            err.statusCode=400;
        }
        if(err.code ==11000)
        {
            let message =`Duplicate ${Object.keys(err.keyValue)} error `
            error = new ErrorHandler(message, 400);
            err.statusCode=400;
        }
        if(err.name=='JSONWebTokenError'){
            let message = `Json Web token is invalid . Try again`;
            error = new ErrorHandler(message, 400);
            err.statusCode=400;

        }
        if(err.name=='TokenExpiredError'){
            let message = `Json Web token is Expired . Try again`;
            error = new ErrorHandler(message, 400);
            err.statusCode=400;

        }

    
    res.status(err.statusCode).json({
        success:false,
        message: error.message || 'Internal Server Error', 
    })
}
}