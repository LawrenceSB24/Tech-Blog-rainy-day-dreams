// Seeding file for comments to posts
const {Comment} = require('../models');

const commentData = [
    {
        comment_content: "Based on processing information given to us by client, massive strides have been made",
        user_id: 1,
        post_id: 1
    },
    {
        comment_content: "Communications have been perfected. Awesome job!",
        user_id: 2,
        post_id: 2
    },
    {
        comment_content: "Everything looks great. Our client is going to be so proud.",
        user_id: 3,
        post_id: 3
    }
];

const commentSeeds = () => Comment.bulkCreate(commentData);

module.exports = commentSeeds;