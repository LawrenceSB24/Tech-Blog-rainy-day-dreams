// Referenced from Mini-Project
const router = require('express').Router();
const { User } = require('../../models');

// Creation of a new user
router.post('/', async (req, res) => {
    User.create(req.body)
    .then((userData) => {
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
        });

        if (!userData) {
            res.status(404);
            res.json('User not found');
            return;
        } 
        res.status(200).res.json(userData);
        
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json(err)
    })
});

// Login for returning users
router.post('/login', async (req, res) => {
    User.findOne(
        {where: {username: req.body.username}}
    )
    .then((userData) => {
        if (!userData) {
            res.status(404);
            res.json({message: 'Incorrect username. Please try again'});
            return;
        }

        const validPW = await userData.checkPassword(req.body.password);

        if (!validPW) {
            res.status(404);
            res.json({message: 'Incorrect password, please try again'});
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({user: userData, message: 'Login successful!'});
        })
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json(err);
    });
});

// Creating a sign-up sheet for new users
router.post('/signup', async (req, res) => {
    User.create(req.body)
    .then((userData) => {
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;

            res.status(200);
            res.json({user: userData, message: 'Account created!'});
        });

        if (!userData) {
            res.status(404);
            res.json({message: 'Error in sugning up. Please try again'});
            return;
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json(err);
    });
});

// Logout option for users
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        res.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end();
    }
});


