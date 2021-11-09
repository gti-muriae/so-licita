import admin from 'firebase-admin';

const firebaseAuth = require("./firebase_config.json");

admin.initializeApp({
    credential: admin.credential.cert(firebaseAuth)
});

async function getConfigRemote() {
    let remoteConfig = admin.remoteConfig();
    const key = remoteConfig.getTemplate();
   key.then((index)=>{
       console.log(index);
   });
}
export { admin, getConfigRemote }