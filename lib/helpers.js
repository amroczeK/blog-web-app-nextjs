import firebase from "firebase/app";
import { firestore, auth } from "../lib/firebase";

/**
 * Retrieves a users/{uid} document with username
 * @param {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = firestore.collection("users");
  const query = usersRef.where("username", "==", username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

/**
 * Converts a firestore document to JSON because
 * Firestore timestamp is NOT serializable to JSON
 * @param {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}

export function getPostsCollection(POSTS_LIMIT) {
  const collection = firestore
    .collectionGroup("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(1);
  return collection;
}

export function getMorePostsCollection(POSTS_LIMIT, cursor) {
  const collection = firestore
    .collectionGroup("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .startAfter(cursor)
    .limit(POSTS_LIMIT);
  return collection;
}

export const fromMillis = firebase.firestore.Timestamp.fromMillis;

// Tells Firestore to save a timestamp on a document, on the server
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export async function getPostPaths() {
  const snapshot = await firestore.collectionGroup("posts").get();

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return paths;
}

export function getPostRef(path){
  const postRef = firestore.doc(path);
  return postRef;
}

export function getUserRef(){
  const ref = firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("posts");
  return ref;
}