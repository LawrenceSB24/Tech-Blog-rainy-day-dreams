// Once user logs in, then new actions can be performed to site
// Actions: Create, update, and delete posts

const router = require('express').Router();
const { Posts, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// const sequelize = require('../../config/connection');

// Retrieves all posts from dashboard
// Same functionality as homepage
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

// Route allowing users to edit their posts AFTER logging in
router.get('/edit/:id', withAuth, (req, res) => {
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
        if (!postData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        } else {
            const post = postData.get({plain: true});
            res.render('edit-post', {
                ...post,
                logged_in: true
            })
        }
    })
    .catch(err => {req.status(500).json(err)});
});

module.exports = router;