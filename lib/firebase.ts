import { initializeApp, getApps, getApp, FirebaseOptions, FirebaseApp } from "firebase/app";
import { Auth, getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  getFirestore,
  collection,
  where,
  getDocs,
  query,
  limit,
  Firestore,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyBFx1KEqdePAhcYlizohmpMV15TZPLYMMM",
  authDomain: "fireblog-f75d0.firebaseapp.com",
  projectId: "fireblog-f75d0",
  storageBucket: "fireblog-f75d0.appspot.com",
  messagingSenderId: "52953583607",
  appId: "1:52953583607:web:af8007a8e2ea27fcdda8f2",
  measurementId: "G-VFL59WT1M6",
};

function createFirebaseApp(config: FirebaseOptions) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

const firebaseApp: FirebaseApp = createFirebaseApp(firebaseConfig);


export const auth: Auth = getAuth(firebaseApp);
export const googleAuthProvider: GoogleAuthProvider = new GoogleAuthProvider();

// Firestore exports
export const firestore: Firestore = getFirestore(firebaseApp);

// Storage exports
export const storage = getStorage(firebaseApp);
export const STATE_CHANGED = 'state_changed';

/// Helper functions


/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username: any) {
  // const usersRef = collection(firestore, 'users');
  // const query = usersRef.where('username', '==', username).limit(1);

  const q = query(
    collection(firestore, 'users'), 
    where('username', '==', username),
    limit(1)
  )
  const userDoc = ( await getDocs(q) ).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc: any) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}
