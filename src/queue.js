import dotenv from 'dotenv';

dotenv.config();

const Queue = require('./lib/Queue');
Queue.process();