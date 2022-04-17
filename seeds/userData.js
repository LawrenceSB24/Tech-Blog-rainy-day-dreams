// Seeding file for user account creation
const {User} = require('../models');

const userData = [
    {
        username: 'JDean24',
        email: 'JD2938746@gmail.com',
        password: '03921unwefdsq!'
    },
    {
        username: 'MDean02398470',
        email: 'MD9182365@gmail.com',
        password: '92731truieoqwh!'
    },
    {
        username: 'IRIS1987',
        email: 'ISEEYOU2038974@gmail.com',
        password: 'p98234yqhefiow!'
    }
];

const userSeed = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = userSeed;