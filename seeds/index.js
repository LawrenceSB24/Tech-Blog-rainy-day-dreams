// Seed file for placeholder data
const userSeed = require('./userData');
const commentSeeds = require('./commentData');
const postSeeds = require('./postData');

const sequelize = require('../config/connection');

const seedDB = async () => {
    await sequelize.sync({force: true})
    console.log('=================');
    await userSeed();
    console.log('=================');
    await commentSeeds();
    console.log('=================');
    await postSeeds();
    console.log('=================');

    process.exit(0);
}

seedDB();