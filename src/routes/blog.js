const express = require("express");
const router = express.Router();
const blog = require("../models").blog;

router.get("/getAllPost/:id", async (req, res) => {
    try{
        await blog.findAll({ where: { 
          userId: req.params.id,
        }})
        .then((data)=>{
          let allPostData = []
          
          data.map((item)=>{
            let postData = {
              id: item.id,
              title: item.title,
              post: item.post
            }
            allPostData.push(postData);
          })
          res.status(200).send(allPostData);
        })
      }
    catch(err){
      res.status(500).send(err);
    }
});
  

//to get a particular user blog
router.get("/getPost/:id", async (req, res) => {
    try{
        await blog.findOne({ where: { 
          userId: req.params.id, 
          title: req.body.title 
        }})
        .then((data)=>{
          res.status(200).send(data.post);
        })
    }
    catch(err){
      res.status(500).send(err);
    }
});


//users will create blog
router.post("/createPost/:id", async (req, res) => {
    try{
      const id = req.params.id;
      const title = req.body.title;
      const post = req.body.post;
  
      await blog.create({
        userId: id,
        title,
        post
      })
      .then((data)=>{
        res.status(200).send("User Blog Successfully Created")
      })
    }
    catch(err){
      res.status(500).send(err);
    }
  });


//users can update blog
router.put("/updatePost/:id", async (req, res) => {
    try{
      await blog.findOne({ 
        where: { 
          userId: req.params.id, 
          title: req.body.title 
        }
      }).then(async ()=>{
        await blog.update({
          post: req.body.post
        },{ 
          where: { 
            userId: req.params.id, 
            title: req.body.title  
          }
        })
        .then( async () => {
          res.status(200).send("Blog updated successfully");
        })
      })
    }
    catch(err){
      res.status(500).send(err);
    }
  });


//user can delete his blog
router.delete("/deletePost/:id", async (req, res) => {
    try{
      await blog.findOne({ 
        where: { 
          userId: req.params.id, 
          title: req.body.title 
        }
      })
      .then( async (data)=>{
        await blog.destroy({ where: { 
          userId: req.params.id, 
          title: req.body.title 
        }})
        .then((datas)=>{
          res.status(200).send("Blog deleted successfully");
        })
      })
    }
    catch(err){
      res.status(500).send(err);
    }
  });
  
 module.exports = router;
