// Imports all models required
const Posts = require('./post');
const User = require('./user');
const Comment = require('./comment');

// Each user hasMany posts
User.hasMany(Posts, {
    foreignKey: 'user_id'
});

// Posts belongsTo User
Posts.belongsTo(User, {
    foreignKey: 'user_id'
});

// Each post hasMany comments
Posts.hasMany(Comment, {
    foreignKey: 'post_id'
});

// Comments for posts belongsTo that post
Comment.belongsTo(Posts, {
    foreignKey: 'post_id'
});

// User hasMany comments (users can have many comments)
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

// Comments belongTo each user 
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// Exports all models for external use
module.exports = { User, Posts, Comment };