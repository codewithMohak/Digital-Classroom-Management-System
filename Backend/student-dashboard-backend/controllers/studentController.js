const Student = require("../models/Student");
const student=require("../models/Student");

//Get Student Data
const getStudent=async(req,res)=>{
    try {
       const student=await Student.findById(req.params.id);
       if(!student) return res.status(404).json({message:"Student Not Found"}) 
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const updateStudent = async (req, res) =>{
    try {
        const student=await Student.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}
module.exports = { getStudent, updateStudent };