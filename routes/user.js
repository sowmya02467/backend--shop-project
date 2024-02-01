
const express = require('express')
// const bcrypt = require('bcrypt');
// const shopper = require('../models/shopper.js');
// const router = express.Router();
// const jwt = require('jisonwebtoken')
// here i am importing the model user.js
const User = require('../models/user')






// to get all users data
router.get('/', async (req, res) => {
//   what ever we put after a ? question mark are the query parameters
    // console.log(req.query)


    // to get all user names as request 
   try{ //after writing this code goto post man in get request == click send request
    const userData = await User.find();
    res.status(200).json({data:userData})
   }
   catch(err){
    res.status(500).json({message:err.message})
   }


    // res.json({  message:  'all users details'});
})









// toget a single data from the user
// here i am using the path parameter as :id
router.get('/:id', async (req, res) => {


  try{
    const user = await User.findById(req.params.id); // to get single user id and name fron db so we have to write this code
  if(user){

    res.json({data : user})
  }else{
    res.sendStatus(404).json({message: 'user not fond'})
  }

  } catch(err){
    res.status(500).json({message:'error occure while querry'})
   }
  

    // res.json( { message: 'single  users data id is one'});
})


// to create a user
// here i a writing the post method
  router.put('/new' ,  async(req, res) => {
  
//  here below i am using the bd

const newUser = new User({userName : req.body.userName})

 await newUser.save();

    // to get the body of the data   

    // console.log(req.body);  // here ths console log data visible in the command .js when we send the request in the post man ,its prits in the command prompt
    // user  created in the db
    
    res.status(200).json({ message : 'a new user  create'})
  })












// to update the user details
// so i am using the put request method
// the pu method actually work on single method
  router.patch('/update/:id' , async (req, res) =>{

   const user = await User.findById(req.params.id);
    
   user.userName = req.body.userName;
   await user.save();


//    what ever we write the inside the / are call path parameters
    //  to delete the spefic id or a user name to update we se req.parama
    // console.log(req.params)  // is show in the command as {id: 3} and {username = ironman}
    // to get the body of the data 
    // console.log(req.body);  // here ths console log data visible in the command .js when we send the request in the post man ,its prits in the command prompt
    // user update in the db
    res.status(200).json({ message : 'the user updated '})
  })


// here the user delete method
  router.delete('/delete/:id' , async (req, res) =>{

  await User.findOneAndDelete(req.params.id) //to delete specific one in the bd we use this method
    // to get the body of the data 
    // in dele request we dont need the body of user details
     res.status(200).json({ message : 'to delete the user '})
  })







module.exports = router