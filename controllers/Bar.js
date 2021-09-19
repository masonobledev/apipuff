let express = require('express')
let router = express.Router()
const { Bar, User } = require('../models')

router.post("/create/", async(req, res) => {
    let message;

    try{
        let u = await User.findOne({ where: { id: req.body.id } })
        if (u) {
            let post = await Bar.create({ 
                name: req.body.bar.name,
                address: req.body.bar.address,
                URL: req.body.bar.url,
                rating: req.body.bar.rating,
                desc: req.body.bar.desc
             })
            await u.addPost(post)

            let { id, content } = await Bar.findOne({ where: { id: post.id } })
            message = { message: "Post made!", data: { id, content }}    
        }
        else {
            message = { message: "Can't make a post, user does not exist", data: null }
        }

    } catch(err) {
        message = { message: "Post Create Failed" }
    }

    res.json(message)

})

router.get("/all/:id", async(req, res) => {
    let u = await User.findOne({ where: { id: req.params.id }})
    let posts = u ? await u.getPosts() : null
    if (posts){
        let cleaned_posts = posts.map( p => {
                    const { id, content } = p
                    return { id, content }
        })

        res.send(cleaned_posts)
    }
    else
        res.send(posts)
})

module.exports = router