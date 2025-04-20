const express = require('express');
const app= express();
const errorMiddleWare=require('./middlewares/error')
const auth=require('./routes/auth')
const cookieParser=require('cookie-parser');
const path =require('path')
const dotenv = require('dotenv');
dotenv.config({path:path.join(__dirname,"config/config.env")})
//Allowing the data in the format of JSON
app.use(express.json());


//Cookie to be parsed for the products
app.use(cookieParser());
const products = require ('./routes/product')
const order=require('./routes/order')
const payment=require('./routes/payment')
const otp=require('./routes/otp');
//middleware for products
app.use('/api/v1/',products)
//middlewares for authentications
app.use('/api/v1/',auth)
app.use('/api/v1/',order)
app.use('/api/v1/',payment)
app.use('/api/v1/',otp)

app.use('/uploads',express.static(path.join(__dirname,'/uploads')))
//Allow Any Port to accept the data
const cors = require('cors');
app.use(cors({
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true,
}));
app.use(
    "/images",
    express.static(path.join(__dirname, "public/images"), {
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".webp")) {
          res.setHeader("Content-Type", "image/webp");
        }
      },
    })
  );
  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    next();
});

  
app.use("/images", express.static(path.join(__dirname, "public/images")));
if(process.env.NODE_ENV==="production")
{
  app.use(express.static(path.join(__dirname,'../fronte/build')));
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../fronte/build/index.html'))
  })
}
app.use(errorMiddleWare)
module.exports = app;