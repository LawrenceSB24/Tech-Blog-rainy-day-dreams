const router = require('express').Router();
const { Posts, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Homepage that contains all posts w/ creator and user comments
// No changes can be made to post
router.get('/', async (req, res) => {
    // Retrieves all posts and JOINS them with the user data
    Posts.findAll({
        attributes: ['id', 'title', 'post_description', 'posted_at'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_content', 'post_id', 'user_id'],
                include: {model: User, attributes: ['username']}
            },
            {model: User, attributes: ['username']}
        ]
    })
    .then(postData => {
        // Serializes data into readable template
        const posts = postData.map((post) => post.get({plain: true}));

        // Passes serialized data and session flag into template
        // Homepage renders posts and user login
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        })
    })
    .catch(err => {req.status(500).json(err)});
});

// Retrieval for specific post
// No changes can be made to post
router.get('/post/:id', async (req, res) => {
    // Retrieves post and JOINS it with the user data
    Posts.findOne({
        where: {id: req.params.id},
        attributes: ['id', 'title', 'post_description', 'posted_at'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_content', 'post_id', 'user_id'],
                include: {model: User, attributes: ['username']}
            },
            {model: User, attributes: ['username']}
        ]
    })
    .then(postData => {
        // If post id is not found, returns an error message
        if (!postData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        // Serializes data into readable template
        const post = postData.get({plain: true});

        // Passes serialized data and session flag into template
        // Homepage renders post and user login
        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        });
    })
    .catch(err => {req.status(500).json(err)});
});

// middleware withAuth to prevent user access to route without login
router.get('/dashboard', withAuth, async (req, res) => {
    User.findByPk(req.session.user_id, {
        attributes: {exclude: ['password']},
        include: [{model: Posts}]
    })
    .then(userData => {
        const user = userData.get({plain: true});
        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    })
    .catch(err => {req.status(500).json(err)});
});

// Login route for users
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

// Signup route for new visitors
router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('signup');
});

module.exports = router;