import mongoose from 'mongoose';

const todo = new mongoose.Schema({

    todoList:String,
    checked:{type:Boolean, 
        default:false
    },
    created:{type:Date,
        default:Date.now(),
        immutable:true
    }
})


export const todos = mongoose.model("todos",todo);