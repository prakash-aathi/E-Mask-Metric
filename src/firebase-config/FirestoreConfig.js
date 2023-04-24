import {initializeApp} from 'firebase/app';
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
        apiKey: "put your api key here",
        authDomain: "esp32-66bef.firebaseapp.com",
        databaseURL: "https://esp32-66bef-default-rtdb.firebaseio.com",
        projectId: "esp32-66bef",
        storageBucket: "esp32-66bef.appspot.com",
        messagingSenderId: "794983780227",
        appId: "1:794983780227:web:55c8a197047bc8372eb0b6",
        measurementId: "G-H958FR4EJD"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

