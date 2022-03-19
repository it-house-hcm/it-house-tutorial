import * as admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";
import config from "config";

function initFirebaseApp() {
  const serviceAccount = config.get<ServiceAccount>("firebase.serviceAccount");
  const cert = admin.credential.cert(serviceAccount);
  const firebase = admin.initializeApp({ credential: cert });
  return firebase;
}

export default initFirebaseApp();
