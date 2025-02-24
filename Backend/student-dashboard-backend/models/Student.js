const mongoose=require("mongoose");

const studentSchema=new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    rollno:{type:String,require:true,unique:true},
    attendance:{type:Number, default:0},
    assignmentComplete:{type:Number,default:0},
    examScores:[{type:Number}],
    badges:[{type:String}],
    notification:[{type:mongoose.Schema.ObjectId,ref:"Notification"}],
});
module.exports=mongoose.model("Student",studentSchema);