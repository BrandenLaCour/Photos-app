const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const User = require('../models/user')


router.get('/register', (req, res) => {
    const message = req.session.message
    req.session.message = ''
    res.render('auth/new.ejs', { message: message })
})

router.post('/register', async (req, res, next) => {

    try {
        const foundUser = await User.findOne({ username: req.body.username })
        if (!foundUser) {
            const createdUser = await User.create(req.body)
            req.session.message = 'Thanks for creating an account!'
            res.redirect('/')

        } else {
            req.session.message = 'Username already taken'
            res.redirect('/auth/register')
        }

    } catch (err) {
        next(err)
    }

})


router.get('/login', async (req, res) => {
    const message = req.session.message
    req.session.message = ''
    if (req.session.username){
    	req.session.message = 'Already Logged In!'
    	res.redirect('/')
    }
    else {

    	res.render('auth/login.ejs', { message: message })

    }
    
})



router.post('/login', async (req, res, next) => {

    try {
        const loginAttempt = req.body
        const foundUser = await User.findOne({ username: loginAttempt.username })
        // search for that username request, 
        // store current user login,
        if (foundUser) {
            // if there is a match, compare passwords
            if (foundUser.password === loginAttempt.password) {
                //grant auth
                req.session.message = `Welcome ${foundUser.username}`
                req.session.userId = foundUser._id
                req.session.username = foundUser.username
                res.redirect('/')

            } else {
            	//if password does not match 
                console.log('Password is incorrect');
                req.session.message = 'Username or Password is incorrect'
                res.redirect('/auth/login')
            }



        } else {
            // if there is not match, return username or password is incorrect
            console.log('Username is incorrect');
            req.session.message = 'Username or Password incorrect'
            res.redirect('/auth/login')
        }

    } catch (err) {
        next(err)
    }

})

router.get('/logout', async (req, res) => {
	
	await req.session.destroy()
	res.redirect('/auth/login')
})















module.exports = router