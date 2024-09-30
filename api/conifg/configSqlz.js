const Sequelize = require('sequelize')
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    })

// added to test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.log(process.env.DB_PASSWORD);
        console.error('Unable to connect to the database:', err.message || err);
    });

module.exports = sequelize