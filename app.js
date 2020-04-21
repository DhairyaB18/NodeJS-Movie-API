const express= require('express');
const app= express();
const mongoose= require('mongoose');
const bodyParser= require('body-parser');
const cors= require('cors');
require('dotenv/config');

app.use(cors());
app.use(bodyParser.json());

// ALTERNATE WAY TO PERFORM CORS OPERATION
// app.use((req,res,next) => {
//     res.header("Access-Control-Allow-Origin","*");
//     res.header("Access-Contol-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//
//     if (req.method==='OPTIONS'){
//       res.header("Access-Control-Allow-Methods","PUT, POST, PATCH, DELETE, GET");
//       return res.json({});
//   }
// });


app.use('/uploads',express.static('uploads'));
//Connect To Databse
mongoose.connect(
  process.env.DB_CONNECTION,
 { useNewUrlParser: true },
() => console.log('Connected to DB')
);

//Import Routes
const postsRoute= require('./routes/posts');

app.use('/posts',postsRoute);


//ROUTES
app.get('/',(req,res)=> {
      res.send('THIS IS THE HOME PAGE');
});


//Listen From Server
app.listen(3000);
