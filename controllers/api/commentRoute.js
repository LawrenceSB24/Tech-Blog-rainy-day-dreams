const router = require('express').Router();
const {Comment} = require('../../models');
const withAuth = require('../../utils/auth');

// Retrieval of all comments on a post
router.get('/', (req, res) => {
    Comment.findAll()
    .then(commentData => res.status(200).json(commentData))
    .catch(err => {req.status(500).json(err)});
})

// Posting new comments (when logged in)
router.post('/', withAuth, async (req, res) => {
    Comment.create({
        ...req.body,
        user_id: req.session.user_id,
        post_id: req.body.post_id
    })
    .then(commentData => res.status(200).json(commentData))
    .catch(err => {req.status(500).json(err)});
});

// Deleting comments on a post
router.delete('/:id', withAuth, async (req, res) => {
    Comment.destroy({where: {id: req.params.id}})
    .then(commentData => {
        if (!commentData) {
            res.status(404).json({message: 'No comment found with this id'});
            return;
        } else {
            res.status(200).json(commentData);
        }
    })
    .catch(err => {req.status(500).json(err)});
});

module.exports = router;