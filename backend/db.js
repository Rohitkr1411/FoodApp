const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const MongoURI=process.env.MongoURI


// Making a clent for alternate method
// const client = new MongoClient(MongoURI, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
//   });


const mongoDB = async () => {
    try {
      await mongoose.connect(MongoURI);
      console.log('Connected!');
      let food_items = await mongoose.connection.db.collection("fooditems");
      let data=await food_items.find({}).toArray() 
      if(data){
      let foodCategory = await mongoose.connection.db.collection("foodCategory");
      let catData=await foodCategory.find({}).toArray() 
      global.foodcategory=catData;
      global.food_items=data;
      }
      //console.log(data);
    } catch (error) {
      console.log('err: ',error);
    }
  };
 


module.exports=mongoDB();