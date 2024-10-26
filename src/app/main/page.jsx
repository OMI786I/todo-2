"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

const Main = () => {
  const { data: session } = useSession();
  console.log(session);
  const [todo, setTodo] = useState("");
  const todos = [
    { id: 1, text: "Learn React" },
    { id: 2, text: "Build a Todo App" },
    { id: 3, text: "Deploy the App" },
  ];
  const handleInputChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    // Logic to add the todo will go here
    setTodo(""); // Clear input after adding
  };

  return (
    <div>
      <header className="w-full text-center py-4">
        <h1 className="text-3xl font-bold text-gray-900">My Todo List</h1>
      </header>
      {session?.user?.email ? (
        <div>
          <div className="flex justify-center">
            {" "}
            <form
              onSubmit={handleAddTodo}
              className="flex w-full max-w-md mt-4"
            >
              <input
                type="text"
                value={todo}
                onChange={handleInputChange}
                className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Add a new task..."
                required
              />
              <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition"
              >
                Add
              </button>
            </form>
          </div>
          <div className="w-full p-16 max-w-md mt-4">
            <ul className="space-y-2">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex justify-between items-center p-2 bg-white rounded-md shadow"
                >
                  <span className="text-gray-800">{todo.text}</span>
                  <button className="text-red-500 hover:text-red-700 transition">
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="text-center font-bold">
          Please Login to continue
          <Link href={"/login"}>
            <p className="text-blue-600 underline">Login here</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Main;
