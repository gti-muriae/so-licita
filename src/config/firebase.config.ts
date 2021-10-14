import admin from 'firebase-admin';

const firebaseAuth = require('../firebase_config.json')

export default admin.initializeApp({
    credential: admin.credential.cert(firebaseAuth)
});