import mongoose from "mongoose";

const settingSchema = new mongoose.Schema({

 websiteName:String,
 email:String,
 phone:String,
 address:String,
 facebook:String,
 instagram:String,
 linkedin:String

},{
 timestamps:true
})


export default mongoose.model(
 "Setting",
 settingSchema
);