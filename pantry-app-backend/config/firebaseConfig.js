// config/firebaseConfig.js
import { initializeApp, credential as _credential, firestore } from 'firebase-admin';
require('dotenv').config();  // Make sure to require dotenv to use environment variables

initializeApp({
  credential: _credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')  // Replace \\n with new line characters
  }),
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
});

const db = firestore();

export default db;
