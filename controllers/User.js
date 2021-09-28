const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const { User } = require('../models');
// const { user } = require('pg/lib/defaults');


/*Register Route
==========================================================*/

router.post("/create", async (req, res) => {
    
    let message 
    console.log(User)
    
    try {
        const user = await User.create({
            // firstName: req.body.user.firstName,
            // lastName: req.body.user.lastName,
            // DOB: req.body.user.DOB,
            // email: req.body.user.email,
            username: req.body.user.username,
            password: bcrypt.hashSync(req.body.user.password, 13),
            role: req.body.user.role,
        });

        const confirmToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

        message = {
            msg:'User Created', 
            user, 
            confirmToken           
        }
    
    } catch (err) {
        console.log(err)
        message = {
            msg:'Failed to Create User'
        }
    }
    res.json(message)
});

/* Login Route - "msg: "Login failed"
=================================================================================== */

router.post("/login", async (req, res) => {
    
    const { username, password } = req.body

    let message
    console.log(User)
    
    try {
         const findUser = await User.findOne({ 
           where :  { username: req.body.username }
        });
        
        if (findUser) {
          const comparePassword = bcrypt.compare( User.password, findUser.password );
    
          if (comparePassword) {
            const token = jwt.sign({ id: findUser.id }, { JWT_SECRET }, { expiresIn: 60 * 60 * 24 });

            message = {
              msg:'Login successful', 
              user, 
              sessionToken: token
              // confirmationToken: confirmToken           
            }

            // console.log(`login successful for ${findUser.username}`);
            // res.status(200).json({
            // // email: findUser.email,
            // userName: findUser.username,
            // sessionToken: token,
            // });
          }
        } else {
        // res.status(401).json({
        // message: "Unauthorized",
        //   });
        message = {
          msg: 'Unauthorized'
        }
        }
      } catch (err) {
        console.log(err);
        // res.status(500).json(err);
        message = {
          msg: 'Login failed'
        }
      }
      res.json(message)
});

/**Get all route
 ==================================================================================*/

//  router.get("/getall", async (req, res) => {
//   let message 
//   console.log(User)
//    try {
//      const users = await User.findAll()

//      return res.json(user)
//    } catch (err) {
//      console.log(err)
//      return res.status(500).json({ error: 'Something went wrong!' })
//    }  
// });

/**Get specific user route
 ==================================================================================*/

//  router.get("/:uuid", async (req, res) => {
//   const uuid = req.params.uuid
//   try {
//     const user = await User.findOne({
//       where: { uuid : uuid },
//       include: 'posts'
//     })

//     return res.json(user)
//   } catch (err) {
//     console.log(err)
//     return res.status(500).json({ error: 'Something went wrong!' })
//   }  
// });

/**Update user
 * ================================================================================*/


/**Delete user
 ==================================================================================*/

//  router.delete("/delete", async (req, res) => {
//   const username  = req.body.user.username
//   let message
//   console.log(User)

//   try {
//     const user = await User.destroy({ 
//       where: { username: username } 
//     });
//     // console.log(user.uuid)
//     // await user.destroy();

//     // return res.json({ message: 'User deleted!' })
//     message = {
//       msg: 'User deleted',
//       user
//     }
//   } catch (err) {
//     console.log(err)
//     // return res.status(500).json({ error: 'Something went wrong!' })
//     message = {
//       msg: 'Failed to delete user'
//     }
//   }  
// });


  


module.exports = router