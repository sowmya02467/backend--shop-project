
const express   = require("express")
  const bcrypt = require("bcryptjs")
  const  sellerlogin = require('../models/seller')
 const jwt = require ("jsonwebtoken")
 const cookie = require('cookie-parser')
const seller = express.Router()

seller.post('/signup', async(req,res)=>{
    const {email,username,password} = req.body
    const salt = await bcrypt.genSalt(10)
    const encryptedPasssword = await bcrypt.hashSync(password,salt)
    try{
        await new  sellerlogin({
            email,
            username,
            password:encryptedPasssword
        }).save()
        res.status(200).json("Seller account created successfully")
    }catch(error){
        console.log(error.message)
    }
})
seller.post('/signin', async(req,res)=>{
    const {email,password} = req.body
    const userObj = await sellerlogin.findOne({email})
    if(!userObj){
        res.send({error:"User doesn't exist"})
    }
    else{
        const isValid = await bcrypt.compare(password,userObj.password)
        if(isValid){
            const token = jwt.sign({
                userId:userObj._id,
                email:email,
                type:'user'
            },process.env.JWT,{expiresIn:'2h'})
            console.log(token)
            res.cookie('token', token, {
                maxAge: 2*60*60*1000,
            }).send({message:"Authentication successfully completed",token,userId:userObj._id})
        }
        else{
            res.send({error:"Invalid email or password"})
        }
    }
})

module.exports = seller