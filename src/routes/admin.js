const express = require("express");
const router = express.Router();
const blog = require("../models").blog;
const users = require("../models").users;

router.get("/getAllUser/:id", async (req, res) => {
  try{
      await users.findAll({ where: { 
        role: "normal user" 
      }})
      .then((users) => {
        res.status(200).send(users);
      })
    }
  catch(err){
    res.status(500).send(err);
  }
});

router.get("/getAllBlogs/:id", async (req, res) => {
  try{
      await blog.findAll()
        .then((data) => {
          res.status(200).send(data);
        })
    }
  catch(err){
    res.status(500).send(err);
  }  
});

router.put("/updateUser/:id", async (req, res) => {
  try{
    const user_id = req.body.id;
    await users.findOne({ where: { id: user_id, role: 'normal' } })
    .then( async (finduser)=>{
      if(!finduser){
        return res.sendStatus(404);
      }
      
      const data = {
        name: req.body.name,
        email: req.body.email,  
      };

      await users.update(data, { where: { id: user_id } })
      .then((value) => {
        res.status(200).send(`Data get Updated of ${data.name} `)
      })
    })
  }
  catch(err){
    res.status(500).send(err);
  }
});

router.delete("/deleteUser/:id", async (req, res) => {
  try {
    const delete_id = req.body.id;
    await users.findOne({ where: { id: delete_id, role: "normal user" } })
      .then(async (user) => {
        if (!user) {
          return res.status(404).send("No User Found");
        }

        blog.findOne({ where: { userId: delete_id } })
          .then(async (blogData) => {
            if (!blogData) {
              users.destroy({ where: { id: delete_id } }).then((value) => {
                return res.status(200).send(`Data get Deleted `);
              });
            }
            else{
              blog.destroy({ where: { userId: delete_id } }).then(() => {
                users.destroy({ where: { id: delete_id } }).then((value) => {
                  return res.status(200).send(`User and his blogs get Deleted `);
                });
              });
            }
          });
      });
  } 
  catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;