const express = require('express');
const router = express.Router();
const validateSession = require('../middleware/validate-session');
const { Cigar, User } = require('../models');

/**Create post =============================================================================*/

router.post("/create", /*validateSession,*/ async(req, res) => {
    // const editCigar = {
    //     brand: req.body.cigar.brand,
    //     profile: req.body.cigar.profile,
    //     shape: req.body.cigar.shape,
    //     wrapper: req.body.cigar.wrapper,
    //     origin: req.body.cigar.origin,
    //     rating: req.body.cigar.rating
    // };

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

/**Get all entries ============================================================================================= */

router.get("/", async(req, res) => {

    let message;
    console.log(Cigar)

       try{
            if (u){
                const sticks = await Cigar.findAll({ include : User })
                message = { msg: "Thanks!", data: { id: sticks.id} }

            }
            else {
                message = { msg: "no reviews to be found", data: null }
            }
        
        } catch(err) {
                message = { msg: "review retrieval failed" }
        }
    
        res.json(message)
    });
        

        
        
            

/**Get all by user id =================================================================*/

router.get("/mine", async(req, res) => {

    let message;
    console.log(Cigar)
    let userid = req.user.id;

    try {
        let u = await User.findOne({ where: { id: req.body.id } })
        if (u) {    
            let mySticks = await Cigar.findAll({ where : { owner: userid } })
            await u.getPosts(mySticks)
        
            message = { msg: "Voila!"}, 
            data
        }

        else {
            message = { msg: "no reviews to be found", data: null }
        }



    } catch (err) {
        message = { msg: "review retrieval failed" }
    }
	
});
    
/**============================================================================================= */
router.put("/edit:id", async(req, res) => {
     const editCigar = {
            brand: req.body.cigar.brand,
            profile: req.body.cigar.profile,
            shape: req.body.cigar.shape,
            wrapper: req.body.cigar.wrapper,
            origin: req.body.cigar.origin,
            rating: req.body.cigar.rating
        };

    try{
        let query = await User.findOne({ where: { id: req.body.id } });
         if(query) {
                let change = await Cigar.update({ query, editCigar })
                message = { msg: "edits completed",}
            }
        else {
            message = { msg: "no reviews to be found", data: null }
        }

        }  catch(err) {
                message = { msg: "review retrieval failed" }
        }
    
        res.json(message)
     });
 

module.exports = router
