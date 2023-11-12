const express = require('express')

const router=express.Router()

const Orders=require('../models/Orders')

router.post('/orderData',async(req,res)=>{

    let data=req.body.orderData
    await data.splice(0,0,{OrderDate:req.body.orderDate})

    let userId=await Orders.findOne({'email':req.body.email})

    if(userId)
    {
        try{
            await Orders.findOneAndUpdate({email:req.body.email},
            { $push:{orderData:data}}).then(()=>{res.status(200).json({success:true})})

        }
        catch(err){
            console.log("Error",err)
            res.send("Server Error",err.message)
        }

    }
    else
    {
        try{
               await Orders.create({
                email:req.body.email, 
                orderData:[data]
               }).then(()=>{
                res.status(200).json({success:true})
               })
        }
        catch(err){
               
            console.log("Error",err)
            res.status(500).json({"Error":error.message})
        }
    }
})


router.post('/myOrderData', async (req, res) => {
    try {
       
        let data = await Orders.findOne({ 'email': req.body.email })
       
        res.status(200).json({orderData:data})
    } catch (error) {
        res.status(500).json({"Error":error.message})
    }
    

});

module.exports=router