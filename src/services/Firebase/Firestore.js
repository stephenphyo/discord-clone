import { getFirestore } from 'firebase/firestore';
import firebaseApp from './FirebaseApp';

const firestore = getFirestore(firebaseApp);

export default firestore;