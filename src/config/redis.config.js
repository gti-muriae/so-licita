import dotenv from 'dotenv';

dotenv.config();

module.exports = {
    host: process.env.HOST_REDIS,
    port: process.env.PORT_REDIS
}
