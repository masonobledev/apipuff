const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const { jwtSecret } = require('../config');
const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { user } = require('pg/lib/defaults');

/*Register Route
==========================================================*/

router.post("/create", async (req, res) => {
    
    let message 
    console.log(User)
    
    try {
        const user = await User.create({
            firstName: req.body.user.firstName,
            lastName: req.body.user.lastName,
            DOB: req.body.user.DOB,
            email: req.body.user.email,
            username: req.body.user.username,
            password: bcrypt.hashSync(req.body.user.password, 13),
            role: req.body.user.role,
        });

        // const confirmToken = jwt.sign({ email: email, id: user.id }, jwtSecret);

        message = {
            msg:'User Created', 
            user, 
            // confirmationToken: confirmToken           
        }
    
    } catch (err) {
        console.log(err)
        message = {
            msg:'Failed to Create User'
        }
    }
    res.json(message)
});

/* Login Route
=================================================================================== */

router.post("/login", async (req, res) => {
    const { email, passwordHash } = req.body

     try {
         const findUser = await User.findOne({ 
           where:  {
                username: req.body.user.username,
                password: req.body.user.password
            } 
        });
        
        if (findUser) {
          const comparePassword = bcrypt.compare(
            passwordHash,
            findUser.passwordHash
          );
    
          if (comparePassword) {
            const token = jwt.sign({ id: findUser.id }, jwtSecret, {
              expiresIn: "24h",
            });

            console.log(`login successful for ${findUser.userName}`);
            res.status(200).json({
            email: findUser.email,
            userName: findUser.userName,
            sessionToken: token,
            });
          }
        } else {
        res.status(401).json({
        message: "Unauthorized",
          });
        }
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

/**Get all route
 ==================================================================================*/

 router.get("/getall", async (req, res) => {
   try {
     const users = await User.findAll()

     return res.json(user)
   } catch (err) {
     console.log(err)
     return res.status(500).json({ error: 'Something went wrong!' })
   }  
});

/**Get specific user route
 ==================================================================================*/

 router.get("/:uuid", async (req, res) => {
  const uuid = req.params.uuid
  try {
    const user = await User.findOne({
      where: { uuid : uuid },
      include: 'posts'
    })

    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong!' })
  }  
});

/**Update user
 * ================================================================================*/


/**Delete user
 ==================================================================================*/

 router.delete("/:uuid", async (req, res) => {
  const uuid = req.params.uuid
  try {
    const user = await User.findOne({ where: { uuid : uuid } })

    await user.destroy()

    return res.json({ message: 'User deleted!' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong!' })
  }  
});


  


module.exports = router