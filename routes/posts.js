const express= require('express');
const router= express.Router();
const Post= require('../models/Post');
const multer= require('multer')

//CREATES AN UPLOADS FOLDER AND STORES IMAGES IN IT
const storage= multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,'./uploads/')
  },
  filename: function(req, file ,cb){
    cb(null, file.originalname);
  }
});

const fileFilter= (req,file,cb) => {
      if(file.mimetype=== 'image/jpeg' || file.mimetype=== 'image/jpg' || file.mimetype=== 'image/png'){
        cb(null,true);
      }else{
        cb(new Error('Image Type Not Supported'),false);
      }

};

const upload= multer({
  storage:storage,
  limits:{
    fileSize: 1024*1024*5
},
  fileFilter:fileFilter
});

// ROUTES
//GETS BACK ALL THE POSTS
router.get('/', async (req,res)=> {
      try{
        const posts= await Post.find();
        res.json(posts);
      }catch(err){
        res.json({message:err})
      }
});

//SUBMITS A POST
router.post('/',upload.single('movieImage') , async (req,res) => {
    console.log(req.file);
    const post=new Post({
      name:req.body.name,
      description:req.body.description,
      img:req.body.img,
      movieImage:req.file.path

    });
    try {
        const savedPost= await post.save();
        res.json(savedPost);
      }catch(err){
        res.json({ message: err });
      }


});

//GIVES BACK A SPECFIC POST
router.get('/:postId', async (req,res) => {
  try{
  const post= await Post.findById(req.params.postId);
  res.json(post);
}catch(err){
  res.json({ message: err });
}
});

//DELETES A POST
//DELETES A POST
router.delete('/:postId', async (req,res) =>{
    try{
    const removedPost = await Post.remove({ _id: req.params.postId });
    res.json(removedPost);
  }catch(err){
    res.json({message:err});
  }

});
//UPDATES A POST
router.patch('/:postId', async (req,res) => {
  try{
  const updatedPost= await Post.updateOne({_id: req.params.postId },{ $set: { name: req.body.name }});
  res.json(updatedPost);
  }catch(err){
    res.json({message:err});
}
});


module.exports= router;
