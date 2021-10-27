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

/*Update User ===================================================================== */


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
        console.log(findUser)
        if (findUser) {
          const comparePassword = bcrypt.compare( req.body.password, findUser.password );
          console.log(comparePassword)
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

/* Get all users Route
============================================================================= */
router.get('/', async (req, res) => {
  
  let message 
  
  try{
      const users = await User.findAll()

      return res.json(users)

  } catch (err){
      console.log(err)
      
      message = {
      msg:'Failed to Retrieve Users'
      }
  }
});
/**Find one user route
 * ========================================================================== */
 router.get('/:uuid', async (req, res) => {
  
  let message 
  const uuid = req.params.uuid

  try{
      const user = await User.findOne(
        
        { where: { uuid } }
        
        );

      return res.json(user)
  } catch (err){
      console.log(err)
      message = {
      msg:'Failed to Retrieve User'
      }
  }
})

/*Update User ===================================================================== */

router.put('/:uuid', async (req, res) => {
  
  let message 
  const uuid = req.params.uuid
  const { username, role } = req.body

  try{
      const user = await User.findOne( { where: { uuid } } );

        user.username = username
        user.role = role

        await user.save()

      return res.json(user)
  } catch (err){
      console.log(err)
      message = {
      msg:'Failed to Retrieve User'
      }
  }
})


/* Logout Route
============================================================================= */
router.delete('/:uuid', async (req, res) => {
  // const { username } = req.body.username;
  const uuid = req.params.uuid

  let message

  try {
      const user = await User.findOne(
        
        { where: { uuid } }
        
        );

      await user.destroy()
      
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
   