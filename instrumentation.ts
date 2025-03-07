import * as admin from "firebase-admin";

// Initialize Firebase Admin SDK if it hasn't been already
if (!admin.apps.length) {
  if (!process.env.ADMIN_CONFIG) {
    throw new Error("ADMIN_CONFIG environment variable is not set.");
  }

  const serviceAccount = JSON.parse(process.env.ADMIN_CONFIG); // Replace with your Firebase service account key

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "mathusan-fwp.appspot.com", // Replace with your Firebase Storage bucket name
  });
}
