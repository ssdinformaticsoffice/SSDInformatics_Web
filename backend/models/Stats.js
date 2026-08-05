import mongoose from "mongoose";


const statsSchema = new mongoose.Schema(
{
    number:{
        type:String,
        required:true
    },

    title:{
        type:String,
        required:true
    },

    icon:{
        type:String,
        default:""
    },

    order:{
        type:Number,
        default:0
    }

},
{
    timestamps:true
}
);


export default mongoose.model("Stats",statsSchema);