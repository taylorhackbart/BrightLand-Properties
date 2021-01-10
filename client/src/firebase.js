import firebase from "firebase/app"
import "firebase/auth"

const api = process.env.REACT_APP_FIREBASE_API_KEY
const authDom = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
const project = process.env.REACT_APP_FIREBASE_PROJECT_ID
const storage = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
const messagingSender = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
const application = process.env.REACT_APP_FIREBASE_APP_ID
const data = process.env.REACT_APP_FIREBASE_DATABASE_URL
const measurement = process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
const app = firebase.initializeApp({
    apiKey: {api},
    authDomain: {authDom},
    projectId: {project},
    storageBucket: {storage},
    messagingSenderId: {messagingSender},
    appId: {application},
    databaseURL: {data},
    measurementId: {measurement}
})


export const auth = app.auth()

export default app