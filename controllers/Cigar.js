let express = require('express')
const { user } = require('pg/lib/defaults')
let router = express.Router()
const { Cigar, User } = require('../models')

/**Create post */
router.post("/posts", async(req, res) => {
    const { userUuid, body } = req.body

    try{
        const user = await User.findOne({ where: { uuid: userUuid } })
        const cigar = await Cigar.create({ body, userId: user.id })

        return res.json(cigar)
    } catch(err) {
        console.log(err)
        return res.status(500).json()
    }
})

/**Read all cigar posts */
router.get("/posts", async(req, res) => {
    const { userUuid, body} = req.body
    try{
        const posts = await Cigar.findAll({ include: 'user' })
        return res.json(posts)
    } catch(err) {
        console.log(err)
        return res.status(500).json()
    }
})

module.exports = router
