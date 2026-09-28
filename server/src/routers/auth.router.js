const express = require('express')
const { registerController, refreshTokenController } = require('../controllers/auth.controller')
const jwt = require('jsonwebtoken')
const authenticate = require('../middleware/auth.middleware')
const router = express.Router()

router.post('/register', registerController )

router.get('/me', authenticate, async(req,res)=>{
    res.status(200).json({
        message: "User fetched successfully",
        data: {
            user: {
                id: req.user._id,
                username:req.user.username,
                email:req.user.email
            }
        }
    })
}) 

router.post('/refresh',refreshTokenController)

module.exports = router  