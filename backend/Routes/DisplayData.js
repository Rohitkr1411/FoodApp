const express = require('express')

const router=express.Router()


const axios = require('axios')

router.post('/foodData', (req,res)=>{
    try{
       // console.log(global.food_items)
        res.send([global.food_items,global.foodcategory]);
    }
    catch(err)
    {
        console.log(err)
        res.send("error")
    }
})

// Get logged in User details, Login Required.
// router.post('/getuser', fetch, async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const user = await User.findById(userId).select("-password") // -password will not pick password from db.
//         res.send(user)
//     } catch (error) {
//         console.error(error.message)
//         res.send("Server Error")

//     }
// })
// Get logged in User details, Login Required.
router.post('/getlocation', async (req, res) => {
    try {
        let lat = req.body.latlong.lat
        let long = req.body.latlong.long
        // console.log(lat, long)
        let location = await axios
            .get("https://api.opencagedata.com/geocode/v1/json?q=" + lat + "+" + long + "&key=74c89b3be64946ac96d777d08b878d43")
            .then(async res => {
               
                let response = res.data.results[0].components;
                // console.log(response)
                let { village, county, state_district, state, postcode } = response
                return String(village + "," + county + "," + state_district + "," + state + "\n" + postcode)
            })
            .catch(error => {
                console.error(error)
            })
        res.send({ location })

    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
})

module.exports=router