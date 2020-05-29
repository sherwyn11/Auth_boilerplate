const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = new express.Router()

router.get('/', (req, res) => {
    res.status(200).send('Works!');
});

router.get('/signup', (req, res) =>{
    res.render('signup.ejs');
});

router.post('/signup', async(req, res) => {
    try{
        const name = req.body.name;
        const email = req.body.email;
        const contact = req.body.contact;
        const password = req.body.password;
        
        const user = new User({
            name,
            email,
            contact,
            password
        })
    
        await user.save()
        .then(async () => {
            const token = await user.createAuthToken();
            res.status(200).send('Data saved successfully!')
        })
        .catch((e) => {
            res.status(401).send(e.name + ': ' + e.errmsg);
        });  

    }catch(e){
        throw new Error('Some error occurred!');
    }
});

router.get('/login', (req, res) => {
    res.render('login.ejs');
});

router.post('/login', async(req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        
        const user = await User.findUserByCredentials(email, password);
        const token = await user.generateAuthToken();
        
        res.status(200).send('Logged in successfully! with \n Email: ' + user.email + '\nGenerated Token: ' + token);

    }catch(e){
        res.status(401).send(e);
    }
});

router.get('/user-data', auth, async(req, res) => {
    try{
        const user = req.user;
        res.status(200).send(user);
    }catch(e){
        throw new Error('Some Error Occurred!');
    }
});

router.post('/logout', auth, async(req, res) => {
    try{
        req.user.tokens = [];
        await req.user.save();
        res.status(200).send('Logged out successfully!');
    }catch(e){
        throw new Error('Some Error Occurred!');
    }
});

module.exports = router;