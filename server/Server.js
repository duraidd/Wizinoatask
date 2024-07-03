import morgan from "morgan";
import express from "express"
import Api from "./Router/Userrouter.js";
import cors from "cors"
import mongoose from "mongoose";
const app = express();

app.use(express.json());
app.use(cors());


mongoose.connect("mongodb://localhost/wizinoadb").then(() => {
    console.log("DB connected Successfully");
}).catch((err) => {
    console.log("DB not connected");
});



app.use("/user", Api);
app.use(morgan("common"));

app.listen(9999);


export default app;
