const mongoose=require('mongoose');
const mongooseURI=('');
const connectToMongo=()=>{
    mongoose.connect(mongooseURI,()=>{
        console.log("connected to mongo")
    })
}
module.exports=connectToMongo;
