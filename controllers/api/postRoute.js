const router = require('express').Router();
const {Posts} = require('../../models');
const withAuth = require('../../utils/auth');

// Retrieval for all posts
router.get('/', withAuth, async (req, res) => {
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
    .then(postData => res.status(200).json(postData))
    .catch(err => {req.status(500).json(err)});
});

// Retrieval for post from single user
router.get('/:id', async (req, res) => {
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
            res.status(200).json(postData);
        }
    })
    .catch(err => {req.status(500).json(err)});
});

// Creating new posts AFTER user login
router.post('/', (req, res) => {
    Posts.create({
        ...req.body,
        user_id: req.session.user_id
    })
    .then(postData => res.status(200).json(postData))
    .catch(err => {req.status(500).json(err)});
});

// Updating posts
router.put('/:id', withAuth, async (req, res) => {
    Posts.update({
        where: {title: req.body.title, post_description: req.body.post_description}
    })
    .then(postData => {
        if (!postData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        } else {
            res.status(200).json(postData);
        }
    })
    .catch(err => {req.status(500).json(err)});
});

// Deleting posts
router.delete('/:id', withAuth, async (req, res) => {
    Posts.destroy({where: {id: req.params.id}})
    .then(postData => {
        if (!postData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        } else {
            res.status(200).json(postData);
        }
    })
    .catch(err => {req.status(500).json(err)});
});

module.exports = router;