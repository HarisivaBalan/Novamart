const mongoose = require('mongoose');


const connectDb = ()=>{
    mongoose.connect(process.env.DB_LOCAL_URI,{
        // useNewUrlParser:true,
        // useUnifiedTopology:true
}).then(con=>{
    console.log(`MongoDb is connnectend to the host : ${con.connection.host}`);
})

}
module.exports =connectDb;