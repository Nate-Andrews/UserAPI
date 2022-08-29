const express = require('express')
const router = express.Router()
const User = require('../models/user')

// get all
router.get('/', async(req, res) => {
    try{
        const users = await User.find()
        res.json(users)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})
// get one
router.get('/:id', getUser, (req, res) => {
    res.send(res.user)
})
// create
router.post('/', async(req, res) => {
    const user = new User({
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth,
        phone: req.body.phone,
        ssn: req.body.ssn
    })

    try{
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})
// update 
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name
    }
    if (req.body.dateOfBirth != null) {
        res.user.dateOfBirth = req.body.dateOfBirth
    }
    if (req.body.phone != null) {
        res.user.phone = req.body.phone
    }
    if (req.body.ssn != null) {
        res.user.ssn = req.body.ssn
    }
    try {
        const updateUser = await res.user.save()
        res.json(updateUser)
    } catch (err) {
        res.status(400),json({message: err.message})
    }
})
// delete
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({Message: 'user deleted'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})
// middleware for getting user
async function getUser(req, res, next) {
    try {
        user = await User.findById(req.params.id)
        if(user == null) {
            return res.status(404).json({message: "Cannot find user"})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message})
    }
    res.user = user
    next()
}

module.exports = router