import * as admin from 'firebase-admin'
import config from '../config'

type FieldValue = admin.firestore.FieldValue
const { serviceAccount } = config.database
const serverTimestamp = admin.firestore.FieldValue.serverTimestamp()

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

export {
    db as default,
    FieldValue,
    serverTimestamp
}