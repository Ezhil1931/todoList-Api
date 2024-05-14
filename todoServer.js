import express from 'express'
import mongoose from "mongoose";
import cors from "cors";
import {todos} from "./model1/todoModel.js"

const PORT=process.env.PORT||3002;
const mongooseUrl="mongodb+srv://ezhilbruce:ezhil1940@mydatabase.e2ac7dw.mongodb.net/?retryWrites=true&w=majority&appName=MyDatabase"


const app=express();
app.use(express.json());
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Hello Todo List")
})

app.get("/todo",async(req,res)=>{
const list= await todos.find();
return res.send(list);

})


app.put("/todo/:id",async(req,res)=>{

try{
 

    const {id}=req.params;
  
    const result= await todos.findByIdAndUpdate(id,req.body)
if(!result){

    return res.send("The book is not founded")
}
return res.send("The book is updated");

}

catch(err){
console.log("error in update")
}

})

app.post("/todo",async(req,res)=>{

    try{

   if(!req.body.todoList){
    return res.send("Give the proper details");

   } 


const newList={
    todoList:req.body.todoList
}
  const list = await todos.create(newList)
return res.send(list);

    }
    catch(err){
res.send("Error in the create opration");
    
}

})

app.delete("/todo/:id",async(req,res)=>{

    const {id} =req.params;
 await todos.findByIdAndDelete(id)


})



mongoose.connect(mongooseUrl)
.then(()=>{

    console.log("mongodb database is connect")
    app.listen(PORT,()=>{
        console.log(`the server is running in port ${PORT}`)
    })
    
})
.catch((err)=>{
console.log("Database not connected ")
})


