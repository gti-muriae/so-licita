import admin from 'firebase-admin';

const firebaseAuth = require('../firebase_config.json');

admin.initializeApp({
    credential: admin.credential.cert(firebaseAuth)
});

export { admin }