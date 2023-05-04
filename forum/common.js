import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js';
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAm9WUVUpsrVpdZTDi41FQLm6IluJDidqY",
    authDomain: "thevillage-5d1d4.firebaseapp.com",
    projectId: "thevillage-5d1d4",
    storageBucket: "thevillage-5d1d4.appspot.com",
    messagingSenderId: "105316126971",
    appId: "1:105316126971:web:6828d4cd6e07114656605e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export function formatDate(date) {
    return date.toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric" })
}