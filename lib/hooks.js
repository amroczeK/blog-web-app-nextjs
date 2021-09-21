import { auth, firestore } from '../lib/firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    // listen to realtime updates on a document in Firestore DB
    if (user) {
      const ref = firestore.collection('users').doc(user.uid);
      console.log(user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
        console.log(doc.data()?.username);
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }
    return unsubscribe;
  }, [user]);

  return { user, username };
}
