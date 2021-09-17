
let express = require('express')
let router = express.Router()
const { User } = require('../models')

router.post("/create", async (req, res) => {
    let message 
    console.log(User)
    try {
        const user = await User.create({
            firstName: req.body.user.firstName,
            lastName: req.body.user.lastName,
            DOB: req.body.user.DOB,
            email: req.body.user.email,
            password: req.body.user.password    
        })
        message = {
            msg:'User Created', 
            user
        }
    } catch (err){
        console.log(err)
        message = {
            msg:'Failed to Create User'
        }
    }
    res.json(message)
})

module.exports = router