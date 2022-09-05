import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import firebaseApp from './FirebaseApp';

const firebaseAuth = getAuth(firebaseApp);
const firebaseAuthProvider = {
    google: new GoogleAuthProvider(),
};

export { firebaseAuth, firebaseAuthProvider };

