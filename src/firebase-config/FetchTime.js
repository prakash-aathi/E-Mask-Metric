import { ref, getDatabase,child,get  } from 'firebase/database'

export function timehr() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, "mask/time/hh")).then((snapshot) => {
        if (snapshot.exists()) {
        const hr=snapshot.val()
        return hr;
        // console.log(snapshot.val());
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
    console.error(error);
    });
}

export function timeMinute() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, "mask/time/mm")).then((snapshot) => {
        if (snapshot.exists()) {
            const min = snapshot.val();
            return min;
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
    console.error(error);
    });
}

export function timeSeconds() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, "mask/time/ss")).then((snapshot) => {
    if (snapshot.exists()) {
        console.log(snapshot.val());
        return snapshot.val();
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
    console.error(error);
    });
}

