const express = require('express')
const app = express()
const port = 8000

const mongoDB=require('./db.js')

mongoDB;

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())

app.use('/api', require("./Routes/CreateUser.js"))

app.use('/api', require("./Routes/DisplayData.js"))

app.use('/api', require("./Routes/OrderData.js"))



app.listen(process.env.Port, () => {
  console.log(`Example app listening on port ${process.env.Port}`)
})