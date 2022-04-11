// Import for required models
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

// Import for connection to database
const sequelize = require('../config/connection');

// Model initiates when user creates password
class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// Properties of the User model that includes
User.init(
    {
        
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // username
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // email (for ner user account creation)
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        // password
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        }
    },
    // Hooks for creating new users and updating user information
    {
        hooks: {
            beforeCreate: async (newUser) => {
                newUser.password = await bcrypt.hash(newUser.password, 8);
                return newUser;
            },
            beforeUpdate: async (updateUser) => {
                updateUser.password = await bcrypt.hash(updateUser.password, 8);
                return updateUser;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

// Exports User model for external use
module.exports = User;