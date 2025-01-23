import { NextResponse } from "next/server";
import * as admin from "firebase-admin";

// Initialize Firebase Admin SDK if it hasn't been already
if (!admin.apps.length) {
  // const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!); // Replace with your Firebase service account key

  admin.initializeApp({
    credential: admin.credential.cert(
      "/usr/local/google/home/mathusan/github.com/mathu97/image-gallery/firebase-admin-config.json"
    ),
    storageBucket: "mathusan-fwp.appspot.com", // Replace with your Firebase Storage bucket name
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
    const [files] = await bucket.getFiles({
      prefix: `${folderName}/`,
    });

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
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}
