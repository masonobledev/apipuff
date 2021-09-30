const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const { User } = require('../models');


/*Register Route
==========================================================*/

router.post("/create", async (req, res) => {
    
    let message 
    // console.log(User)
    
    try {
        const user = await User.create({
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
    // console.log(req.body)
    
    try {
         const findUser = await User.findOne({ 
           where :  { username: req.body.username }
        });
        
        if (findUser) {
          const comparePassword = bcrypt.compare( User.password, findUser.password );
    
          if (comparePassword) {
            const token = jwt.sign({ id: findUser.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

            message = {
              msg:'Login successful', 
              user: findUser, 
              sessionToken: token          
            }

          }
        } else {

        message = {
          msg: 'Unauthorized'
        }
        }
      } catch (err) {
        console.log(err);

        message = {
          msg: 'Login failed'
        }
      }
      res.json(message)
});

/* Logout Route
============================================================================= */
router.delete('/logout', async (req, res) => {
  const { username } = req.body.username;

  let message

  try {
      const byeUser = await User.findOne({ 
        where: { username: username }
      });

      await byeUser.destroy()
      
            message = {
              msg: 'Successfully logged out'
            };
          
          } catch (err) {
            console.log(err);
        
                message = {
                  msg: 'Logout failed'
                }
          }
        
          res.json(message)
      
      });
      
      module.exports = router
   