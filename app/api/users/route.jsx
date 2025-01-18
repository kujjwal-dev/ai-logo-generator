import { db } from "@/configs/FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Parse the incoming request body
    const { userEmail, userName } = await req.json();

    // Reference the user document in Firestore
    const docRef = doc(db, "users", userEmail);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // If user already exists, return their data
      return NextResponse.json(docSnap.data());
    } else {
      // Insert new user
      const data = {
        userName: userName,
        email: userEmail,
        credits: 5,
      };
      await setDoc(doc(db, "users", userEmail), data);

      return NextResponse.json(data, { status: 201 });
    }
  } catch (error) {
    console.error("Error handling POST /api/users:", error);

    // Return a 500 status with the error message
    return NextResponse.json(
      { success: false, message: "An error occurred while processing the request." },
      { status: 500 }
    );
  }
}
