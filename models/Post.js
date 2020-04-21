const mongoose= require('mongoose');


const PostSchema= mongoose.Schema({

  name:{
    type: String,
    required:true
  },

  description: {
    type: String,
    required:true
  },

  img: {
    type: String,
    unique:true

  },

  movieImage: {
    type: String

  }

});
PostSchema.path('img').validate((val) => {
    urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlRegex.test(val);
}, 'Invalid URL.');



module.exports= mongoose.model('Posts',PostSchema);
