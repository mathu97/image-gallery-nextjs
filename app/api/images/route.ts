import { NextResponse } from "next/server";
import * as admin from "firebase-admin";

// Initialize Firebase Admin SDK if it hasn't been already
if (!admin.apps.length) {
  const ADMIN_CONFIG = process.env.MATHUSAN_ADMIN_CONFIG?.replace(/\n/gm, "\n");
  if (!ADMIN_CONFIG) {
    throw new Error("MATHUSAN_ADMIN_CONFIG environment variable is not set.");
  }

  if (!process.env.FIREBASE_WEBAPP_CONFIG) {
    throw new Error(
      "FIREBASE_WEBAPP_CONFIG environment variable is not set, this should be automatically available if deployed to Firebase App Hosting"
    );
  }

  const webAppConfig = JSON.parse(process.env.FIREBASE_WEBAPP_CONFIG);
  if (!webAppConfig.storageBucket) {
    throw new Error("storageBucket is required in FIREBASE_WEBAPP_CONFIG");
  }
  const serviceAccount = JSON.parse(ADMIN_CONFIG); // Replace with your Firebase service account key

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: webAppConfig.storageBucket,
  });
}

const bucket = admin.storage().bucket();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number.parseInt(searchParams.get("page") || "1", 10);
  const limit = 20;
  const folderName = "image-gallery-nextjs";

  try {
    // Fetch all files from Firebase Storage
    let [files] = await bucket.getFiles({
      prefix: `${folderName}/`,
    });

    files = files.filter((file) => file.name !== `${folderName}/`);

    // Paginate the files
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedFiles = files.slice(startIndex, endIndex);

    // Map the files to the desired format
    const promises = paginatedFiles.map(async (file, index) => {
      await file.makePublic();
      return {
        id: startIndex + index + 1,
        url: file.publicUrl(),
        title: file.name,
      };
    });

    const images = await Promise.all(promises);

    return NextResponse.json(images);
  } catch (error) {
    console.error("Error fetching images from Firebase Storage:", error);
    return NextResponse.json(
      { error: `Failed to fetch images: ${error}` },
      { status: 500 }
    );
  }
}
