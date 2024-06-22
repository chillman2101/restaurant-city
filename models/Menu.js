import mongoose from "mongoose";


const MenuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,        
    },
    price: {        
        required: true,
        type:Number
    },
    image: {                
        type:String
    },
    description: {        
        type:String
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"active",
        required:true
    },
    createdAt:{
        type:Number,
    },
    updatedAt:{
        type:Number,
    }
},{
    timestamps:{
        currentTime: () => Math.floor(Date.now() / 1000)
    }
})

export default mongoose.model('menu', MenuSchema)