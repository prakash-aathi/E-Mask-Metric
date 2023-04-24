import { getDatabase, ref, set } from "firebase/database";

export function writeUserData({hr,m,s}) {
    
  const db = getDatabase();
    set(ref(db, 'mask/time/'), {
        hr: hr,
        mm: m,
        ss:s
  });
}