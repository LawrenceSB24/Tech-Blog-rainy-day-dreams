// Import for necessary models
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Comment model is extension of Model
class Comment extends Model {}

// Framework for Comment model
Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // Cotent of the comment typed by user
        comment_content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // Date comment was posted
        posted_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        // Comment is tied to the id of the user
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        // Comment is tied to the post being commented
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
);

// Exports Comment model for external use
module.exports = Comment;