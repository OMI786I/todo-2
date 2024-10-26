import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const dataCollection = db.collection("do-list");
  try {
    const myData = await dataCollection.find({ email: params.email }).toArray();
    return NextResponse.json({ myData });
  } catch (error) {
    return NextResponse.json({ message: "No Data Found" });
  }
};
