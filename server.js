const express = require('express');
const bcrypt = require("bcryptjs"); //importing the bcrypt liberary to encrypt the password
// // here adding the mongoose url
const shopper = require("./routes/shopper.js")
const seller = require("./routes/seller.js")
const cart = require("./routes/cart.js")
const product = require("./routes/product.js")
const purchase = require("./routes/purchase.js")
require("dotenv").config();


const cors = require('cors');

const app = express();
// Enable CORS for all routes
app.use(cors());

//  const uri = 'mongodb+srv://sowmya:4FsLvQ3eLpz04Vbr@cluster0.jkezxsj.mongodb.net/shop?retryWrites=true&w=majority'

// // to understand the express the getting the data from the front end is in json formate of that we are writing the below code

app.use(express.json())


// // here iam atteching the views folder that means we can see front end work here
// app.set('view engine', 'ejs') //setting the views
const bodyParser = require('body-parser')
// const jwt = require('jsonwebtoken')
// const cookieParser = require('cookie-parser')
app.use(bodyParser.urlencoded({extended: true}))


// // importing the mongoose
const mongoose = require('mongoose');
// // connecting the moongose
// mongoose.connect(uri);
// // here checting the db connected or not
// const db = mongoose.connection;

// db.once('open', () => {
//     console.log("db sucessfully connected")
//      const collectionArr = Object.keys(db.collections)
//      console.log(collectionArr)
// })

// // if thre db is not connected its show error in server by we use below metyhod
// db .on('error' ,(error) => {
//     console.log("error")
// })


// app.get('/', (req, res ) =>{
//     res.status(200).json({message: "hellow snupie"})
// })





// // here i am creating the view sign in  sever and method

// app.get('/signin', (req, res) => {
//     res.render('signin.ejs')
// })


// app.get('/signup', (req, res) => {
//     res.render('signup.ejs')
// })



// app.post('/signup',  async(req, res)=>{
//   const{name, email, password : plainTextPassword} = req.body;
//   console.log(req.body)
// //   const salt = bcrypt.genSalt(10);
    //  const encryptedPassword  = await bcrypt.hashSync(plainTextPassword, salt);


// //      try{
// //         await user.create({
// //             name,
// //             email,
// //             password:encryptedPassword
// //         })
// //         res.redirect('/signin')
// //      }
// //      catch(error){
// //         console.log(error)
// //      }
//  })






// // here i am importing the my user router in the server .js
// const userRouter = require("./routes/user");
// const user = require('./models/user');

// app.use('/users', userRouter) //heres i am using the router by use command


// app.listen(5000);
// console.log('server is listening on 5000')



app.use('/shopper',shopper)
app.use('/seller',seller)
app.use('/cart',cart)
app.use('/purchase',purchase)
app.use('/product',product)

const dbName = 'shop-project'
mongoose.connect(process.env.MONGODB_URI ,{
    // useNewUrlParser: true,                      // Use the latest URL parser
    // useUnifiedTopology: true,                  // Use the new server discovery and monitoring engine
    dbName, // Specify the database name
  })
.then(()=>{
    app.listen(process.env.PORT, ()=> console.log(`Server is listening on Port: ${5000}`));
})
.catch((error) => console.log(`${error} did not connet`));

const db = mongoose.connection
db.once('open',()=>{
    console.log('Successfully connected to db')
})
db.on('error',(error)=>{
    console.log(error)
})