const express = require('express');
const router = express.Router();
const { Cigar, User } = require('../models');

/**Create post */

router.post('/create/', async(req, res) => {
    let message;
    console.log(Cigar)
    
    try{
        let u = await User.findOne({ where: { id: req.body.id } })
        if (u) {
            let stick = await Cigar.create({ content: req.body.content })
            await u.addPost(stick)

            let { id, content } = await Cigar.findOne({ where: { id: stick.id } }) 
            message = { msg: "Thanks!", data: { id, content } }
        }
        else {
            message = { msg: "Can't make a post--no user to be found", data: null }
        }
        
    } catch(err) {
                message = { msg: "review post failed" }
        }
            
    res.json(message)
});


/**Get all by user id*/

router.get("/all/:id", async(req, res) => {
    let u = await User.findOne({ where: { id: req.params.id }})
    
    let sticks = u ? await u.getPosts() : null
    if (sticks){
        let all_sticks = sticks.map( s => {
            const { id, content } = s
            return { id, content }
        })
        
        res.send(all_sticks)
    }
    else
    res.send(sticks)
});

module.exports = router

/**============================================================================================= */
// router.get("/posts", async(req, res) => {
//     const { userUuid, body } = req.body

//     try{
//         const user = await User.findOne({ where: { uuid: userUuid } })
//         const cigar = await Cigar.create({ body, userId: user.id })

//         return res.json(cigar)
//     } catch(err) {
//         console.log(err)
//         return res.status(500).json()
//     }
// })