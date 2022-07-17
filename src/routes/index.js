const express=require("express")
const router=express.Router()

router.use("/registration", require("./users"))

router.use("/admin", require("./admin"));

router.use("/basic", require("./blog"));

router.get("/home", (req,res) =>{
    res.status(200).send("hello user")
})

module.exports=router