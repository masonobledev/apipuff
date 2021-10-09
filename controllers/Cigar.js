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

/**Update Post ========================================================================================= */

router.put("/:uuid", async (req, res) => {

  let message
  const uuid = req.params.uuid
  const { brand, profile, shape, wrapper, origin } = req.body

  try {
 
    const sticks = await Cigar.findOne(
      
      { where: { uuid } }
      
      );

      sticks.brand = brand
      sticks.profile = profile
      sticks.shape = shape
      sticks.wrapper = wrapper
      sticks.origin = origin

      await sticks.save()

    message = { msg: "Thanks!", data: sticks };

  } catch (err) {
    message = { msg: "review retrieval failed" };
  }

  res.json(message)

});

module.exports = router;