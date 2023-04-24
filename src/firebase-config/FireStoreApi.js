import {
    collection, addDoc,
    doc, getDoc, getDocs, query, where, updateDoc, setDoc
} from "firebase/firestore"; 
import { db } from "./FirestoreConfig";

const userCollectionRef = collection(db, "users");

class UserDataService{
    addUsers = (id, data) => {
        const formattedData = {
            email: data.email,
            name: data.name,
            maskId: data.maskId,
            mobileNumber: "",
            BloodGroup: "",
            city: "",
            age: "",
         }
        const docRef = doc(userCollectionRef, id);
        setDoc(docRef, formattedData)
            .then(() => {
                console.log("Document written with ID: ");
            })
            .catch((error) => { 
                console.error("Error adding document: ", error);
            })
    }

    updateUsers = (id, data) => { 
        const docRef = doc(userCollectionRef, id);
        updateDoc(docRef, data)
            .then(() => {
                console.log("Document updated with ID: ");
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            })
    }

    getUser = (id) => {
        const bookDoc = doc(db, "users", id);
        return getDoc(bookDoc);
      };


}

export default new UserDataService();