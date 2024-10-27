"use client";
import Link from "next/link";
export const dynamic = "force-dynamic";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-indigo-700 text-white">
      <div className="p-8 text-center bg-blue-800 rounded-lg shadow-lg max-w-lg">
        <h1 className="text-6xl font-bold mb-4">Welcome!</h1>
        <p className="text-xl font-light mb-8">
          A short and fun todo app made with next js
        </p>

        <Link href={"/api/auth/signin"}>
          <button className="px-8 py-4 text-lg font-semibold text-indigo-700 bg-white rounded-full shadow-md hover:bg-indigo-100 transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}
