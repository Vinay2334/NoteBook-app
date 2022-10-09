const mongoose=require('mongoose');
const mongooseURI=('mongodb+srv://Vinay:9968393810ab@cluster0.blhljtt.mongodb.net/inotebook?retryWrites=true&w=majority');
const connectToMongo=()=>{
    mongoose.connect(mongooseURI,()=>{
        console.log("connected to mongo")
    })
}
module.exports=connectToMongo;