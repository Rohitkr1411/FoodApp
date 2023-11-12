const express = require('express')

const router=express.Router()

const User=require('../models/User.js')

const  { body, validationResult } = require('express-validator');

const bcrypt=require('bcrypt');

const jwt=require('jsonwebtoken');

const jwtSecret=process.env.JwtSecret;

router.post('/createUser',
[body('email').isEmail().withMessage('Not a valid e-mail address'),
body('password').isLength({ min: 5 }).withMessage('Password is too short!!')],
async(req,res)=>{
try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let salt=  await bcrypt.genSalt(10);
    let secPassword= await bcrypt.hash(req.body.password,salt);
   await  User.create({
        name:req.body.name,
        location:req.body.location,
        email:req.body.email,
        password:secPassword
    }).then(user => res.json({success:true}));

}
catch(err)
{
    console.log(err)
    res.send({success:false})
}
})

router.post('/loginUser',
[body('email').isEmail().withMessage('Not a valid e-mail address'),
body('password').isLength({ min: 5 }).withMessage('Password is too short!!')]
,async(req,res)=>{
try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
   const userData= await User.findOne({email: req.body.email})
  
   if(!userData)
   {
    return res.status(400).json({ errors:"Try logging in with correct email!" });
   }

   const saltRounds = 10; // Adjust this according to your security needs
const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
   const pwdCompare= await bcrypt.compare(req.body.password,hashedPassword);

  

   if(!pwdCompare){
   return res.status(400).json({ errors:"Try logging in with correct password!" });
   }
   
   const data={
    user:{
        id:userData.id
    }
   }
   const authToken= await jwt.sign(data,jwtSecret);

   return res.status(200).json({success:true,authToken:authToken});
}
catch(err)
{
    console.log(err)
    res.send({success:false})
}
})

module.exports=router



