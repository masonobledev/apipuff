// const express = require("express");
// const router = express.Router();
// const validateSession = require('../middleware/validateSession');
// const { Cigar, User, Rating } = require("../models");

// /**Create post =============================================================================*/

// router.post("/create", /*validateSession,*/ async (req, res) => {

//     let message;

//     const { cigarId, body } = req.body

//     try {
//           const user = await User.findOne({ where: { uuid: userUuid } })

//           const stick = await Cigar.findOne({ where: {cigarId: }})

//           const grade = await Rating.create({ ...req.body, userId: user.id });

//         let { id, content } = await Cigar.findOne({ where: { id: stick.id } });
//         message = { msg: "Thanks!", data: { id, content } };

//     } catch (err) {
//       console.log(err)
//         message = { 
//         msg: "review post failed", err 
//         };
//     }
//     res.json(message);
//   }
//   );