// import { connectDB } from "@/lib/connectDB";

// export const POST = async (request) => {
//   const newData = await request.json();
//   const db = await connectDB();
//   const dataCollection = db.collection("do-list");

//   try {
//     const res = await dataCollection.insertOne(newData);
//     return new Response(JSON.stringify({ message: "Added Successfully" }), {
//       status: 200,
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Content-Type": "application/json",
//       },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ message: "Something Went Wrong" }), {
//       status: 400,
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Content-Type": "application/json",
//       },
//     });
//   }
// };

import { connectDB } from "@/lib/connectDB";

export const POST = async (request) => {
  const newData = await request.json();
  const db = await connectDB();
  const dataCollection = db.collection("do-list");
  try {
    const res = await dataCollection.insertOne(newData);
    return new Response(JSON.stringify({ message: "Added Successfully" }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Something Went Wrong" }), {
      status: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  }
};
