import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  db,
  //  auth
} from './firebaseDB';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  User,
  signOut,
} from 'firebase/auth';
import { fbErrorHandlingMessage } from '~/helpers';
import Swal from 'sweetalert2';
import { UserInfo } from '@firebase/auth-types';

class FirebaseDataService {
  async getAllUsers(): Promise<any> {
    const usersDocs = collection(db, 'users');
    const usersSnapshot = await getDocs(usersDocs);
    const userList = usersSnapshot.docs.map((doc) => doc.data());
    return userList;
  }

  async getAllRegistrations(): Promise<any> {
    const registrationDocs = collection(db, 'registrations');
    const registrationSnapshot = await getDocs(
      query(registrationDocs, orderBy('createdAt', 'desc'))
    );
    const registrationList = registrationSnapshot.docs.map((doc) => doc.data());
    return registrationList;
  }

  async insertRegistration(data: object): Promise<any> {
    const docRef = await addDoc(collection(db, 'registrations'), data);
    return docRef;
  }

  async createUser(
    fullName: string,
    email: string,
    password: string
  ): Promise<User> {
    try {
      const credential = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password
      );

      await updateProfile(credential.user, {
        displayName: fullName,
      });

      await sendEmailVerification(credential.user);

      console.log('credentials', credential);

      alert('Email verification link has been sent to your mail. Verify it.');
      return credential.user;
    } catch (err) {
      const errMsg = fbErrorHandlingMessage(err.code);
      Swal.fire(errMsg, err.message, 'error');
      throw err;
    }
  }

  async loginUser(email: string, password: string): Promise<UserInfo> {
    try {
      const { user } = await signInWithEmailAndPassword(
        getAuth(),
        email,
        password
      );

      return user;
    } catch (err) {
      const errMsg = fbErrorHandlingMessage(err.code);
      Swal.fire(errMsg, err.message, 'error');
      throw err;
    }
  }

  async logout() {
    try {
      await signOut(getAuth());
    } catch (err) {
      const errMsg = fbErrorHandlingMessage(err.code);
      Swal.fire(errMsg, err.message, 'error');
      throw err;
    }
  }

  // TODO: Delete this in next release
  async updateTimestampField() {
    const regRef = collection(db, 'registrations');
    const snapshot = await getDocs(regRef);
    await Promise.all(
      snapshot.docs.map((doc) =>
        updateDoc(doc.ref, { createdAt: serverTimestamp(), updatedAt: null })
      )
    );
  }
}

export default new FirebaseDataService();
