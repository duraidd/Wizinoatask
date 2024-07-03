import mongoose from "mongoose";

let schema = mongoose.Schema({
    email: { type: String, default: "" },
    password: { type: String, default: "" },
    otp: { type: Number, default: 0 },
    xldataUrl:{type:String,default:""}
});

let modal = mongoose.model("MyDatas", schema, "MyDatas");


export default modal;