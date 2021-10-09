const express = require("express");
const router = express.Router();
const validateSession = require('../middleware/validateSession');
const { Cigar, User } = require("../models");

/**Create post =============================================================================*/

router.post("/create", /*validateSession,*/ async (req, res) => {

    let message;

    const { userUuid, body } = req.body

    try {
          const user = await User.findOne({ where: { uuid: userUuid } })

          const stick = await Cigar.create({ ...req.body, userId: user.id });

        let { id, content } = await Cigar.findOne({ where: { id: stick.id } });
        message = { msg: "Thanks!", data: { id, content } };

    } catch (err) {
      console.log(err)
        message = { 
        msg: "review post failed", err 
        };
    }
    res.json(message);
  }
  );


/**Get all entries ============================================================================================= */

router.get("/", async (req, res) => {
  let message;

  try {

    const sticks = await Cigar.findAll(
      
      // { where: { userId: req.body.userId } } 
      
      );
    
    message = { msg: "Thanks!", data: sticks };

  } catch (err) {
    message = { msg: "review retrieval failed" };
  }

  res.json(message);
});

/**Get all by user id =================================================================*/

router.get("/mine", async (req, res) => {
  let message;

  try {
 
    const sticks = await Cigar.findOne(
      
      { where: { userId: req.body.userId } }
      
      );

    message = { msg: "Thanks!", data: sticks };
    
    // let mySticks = await Cigar.findAll({ where: { id: req.params.id } });
    // await u.getPosts(mySticks)

    message = { msg: "Voila!", data: mySticks };

  } catch (err) {
    message = { msg: "review retrieval failed" };
  }

  res.json(message)

});

/**============================================================================================= */
router.put("/edit:id", async (req, res) => {
  const editCigar = {
    brand: req.body.cigar.brand,
    profile: req.body.cigar.profile,
    shape: req.body.cigar.shape,
    wrapper: req.body.cigar.wrapper,
    origin: req.body.cigar.origin,
    rating: req.body.cigar.rating,
  };

  try {
    let query = await User.findOne({ where: { id: req.body.id } });
    if (query) {
      let change = await Cigar.update({ query, editCigar });
      message = { msg: "edits completed" };
    } else {
      message = { msg: "no reviews to be found", data: null };
    }
  } catch (err) {
    message = { msg: "review retrieval failed" };
  }

  res.json(message);
});

module.exports = router;