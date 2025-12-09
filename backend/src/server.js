import express from "express"
import {ENV} from "./lib/env.js"
import path from "path"


const app=express();

const __dirname=path.resolve()


app.get("/hello",(req,res)=>{
    res.status(200).json({msg:"message from api"})
})

// make our app ready for the deployment
// connects the backend and frontend it will send the static files of the frontend from dist folder 
if(ENV.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("/{*any}",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })

}
app.listen(ENV.PORT,()=>console.log("server is running port on",ENV.PORT))