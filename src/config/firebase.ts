import admin from 'firebase-admin';
import 'firebase-admin/auth';
import 'firebase-admin/storage';
import * as serviceAccount from '../../serviceAccount.json';

export class Firebase {
  public configAdminSdk = {
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET, // Solo para inicializar Storage si lo necesitas
  };

  public app = admin.initializeApp(this.configAdminSdk);
  public auth = admin.auth();
  public storage = admin.storage();

  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp(this.configAdminSdk);
      
    }
  }
}

export const firebaseInstance = new Firebase();

export const auth = firebaseInstance.auth;
export const storage = firebaseInstance.storage;
