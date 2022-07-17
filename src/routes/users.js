const express = require("express");
const router = express.Router();
const users = require("../models").users;
const bcrypt = require("bcrypt");


//signup
router.post("/signup", async (req, res) => {
    const {name, email, password, role } = req.body;

    try{
        if(!name || !email || !password || !role){
            return res.status(400).send("Please enter all fields");
        }
        await users.findOne({ where: { email }})
            .then(async (ExistUser) => {
                if(ExistUser) {
                    return res.json({ message: "user with email already exists "});
                }
                
                await users.create({
                    name, 
                    email,
                    password,
                    role,
                })
                .then(async (value) => {
                    res.status(200).send(`${name} - Successfully Registered`);
                });
            });
    }
    catch(err){
        res.status(500).send(err);
    }

});

//login
router.post("/login", async (req, res) => {
    const { email, password} = req.body;
    try{
        if( !email || !password){
            return res.status(400).send("Please enter all fields");
        }
        await users.findOne({ where: { email }})
        .then( async (userdata) => {
            if(await bcrypt.compare(password, userdata.password)){
                return res.json({ message: "Successful  login "});
            }
            else{
                return res.json({ message: "Incorrect pssword "});
            }
        })
        
    }

    catch(err){
        res.status(500).send(err);
    }

});

//changing password
router.put("/changepass", async (req, res) => {
    const { email, oldpassword, newpassword } = req.body;

    try {
        if( !email || !oldpassword || !newpassword ){
            return res.status(400).send("Please enter all fields")
        }
        await users.findOne({ where: { email }})
        .then(async (ExistUser) => {
            if(await bcrypt.compare(oldpassword, ExistUser.password) ){
                const hashedpassword = await bcrypt.hash(newpassword, 10);
                await users.update({
                    password: hashedpassword,
                },{
                    where:
                        { id: ExistUser.id },
                })

            }
            res.status(200).send(`${ExistUser.name} -Password changed successfully `);
        })

    }
catch(err){
    res.status(200).send(err);
}

})


module.exports=router