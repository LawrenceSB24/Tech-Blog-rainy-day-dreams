// Seeding file for posts to site
const {Posts} = require('../models');

const postData = [
    {
        title: "Test 1",
        post_description: "This is a test of the Regnad Commputing system for processing binary data to utf-8",
        user_id: 1
    },
    {
        title: "Test 2",
        post_description: "This is a test of the Regnad Commputing system for communications to client",
        user_id: 2
    },
    {
        title: "Test 3",
        post_description: "This is a test of the Regnad Commputing system for final preparations",
        user_id: 3
    }
];

const postSeeds = () => Posts.bulkCreate(postData);

module.exports = postSeeds;