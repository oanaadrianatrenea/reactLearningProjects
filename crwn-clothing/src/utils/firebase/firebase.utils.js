import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    // signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query, getDocs
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDrZC6xeC7Sjq2EoLbSMPx5HoXXyGqLRWQ",
    authDomain: "crwn-clothing-db-5d102.firebaseapp.com",
    projectId: "crwn-clothing-db-5d102",
    storageBucket: "crwn-clothing-db-5d102.appspot.com",
    messagingSenderId: "350175141360",
    appId: "1:350175141360:web:5ea67397e326d4c6ab9135"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
//   export const signInWithGoogleRedirect =() => signInWithRedirect(auth, googleProvider);
  export const db = getFirestore();

  export const addCollectionDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
    });

    await batch.commit();
  } 

  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
    
    // .reduce((acc, docSnapshot) => {
    //   const { title, items } = docSnapshot.data();
    //   acc[title.toLowerCase()] = items;

    //   return acc;
    // }, {});

    // return categoryMap;
  }

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName, email, createAt, ...additionalInformation
            });
        } catch(error){
            console.log('error creating the user', error.message);
        }
    }

    return userSnapshot;
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return; 

    return await createUserWithEmailAndPassword(auth, email, password)
  }

  export const signInUser = async (email, password) => {
      if (!email || !password) return; 

      return await signInWithEmailAndPassword(auth, email, password);
  }

  export const signOutUser = async () => await signOut(auth);

  export const onAuthStateChangedListener = (callback) => {
    
    onAuthStateChanged(auth, callback);
  }

  export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth, (userAuth) => {
          unsubscribe();
          resolve(userAuth);
        },
        reject
      )
    })

  }