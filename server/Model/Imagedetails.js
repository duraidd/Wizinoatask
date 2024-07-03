import mongoose from "mongoose";

let schema = mongoose.Schema({
    image_name: { type: String, default: "" },
    image_url: { type: String, default: "" }
});

let modal = mongoose.model("MyImg", schema, "MyImg");

export default modal;