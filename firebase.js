import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {

apiKey: "AIzaSyCVPygetkrxq1lTo4Ysfmd4MSma1QslE4A",
authDomain: "shelf-therapy.firebaseapp.com",
projectId: "shelf-therapy",
storageBucket: "shelf-therapy.firebasestorage.app",
messagingSenderId: "841938137086",
appId: "1:841938137086:web:1c5d8dceee7e4ecd69daaf"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
