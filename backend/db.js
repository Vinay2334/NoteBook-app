const mongoose=require('mongoose');
const mongooseURI="mongodb://localhost:27017/inotebook";
const connectToMongo=()=>{
    mongoose.connect(mongooseURI,()=>{
        console.log("connected to mongo")
    })
}
module.exports=connectToMongo;