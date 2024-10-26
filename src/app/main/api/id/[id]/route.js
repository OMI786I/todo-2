import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const dataCollection = db.collection("do-list");
  try {
    const resp = await dataCollection.findOne({
      _id: new ObjectId(params.id),
    });
    return NextResponse.json({ message: "booking found", data: resp });
  } catch (error) {
    return NextResponse.json({ message: "Something Went Wrong" });
  }
};

export const DELETE = async (request, { params }) => {
  const db = await connectDB();
  const dataCollection = db.collection("do-list");
  try {
    const resp = await dataCollection.deleteOne({
      _id: new ObjectId(params.id),
    });
    return NextResponse.json({
      message: "deleted the booking",
      response: resp,
    });
  } catch (error) {
    return NextResponse.json({ message: "Something Went Wrong" });
  }
};
