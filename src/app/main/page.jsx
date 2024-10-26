"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Main = () => {
  const { register, handleSubmit, reset } = useForm();
  const { data: session } = useSession();
  console.log(session);
  const [todo, setTodo] = useState("");
  const todos = [
    { id: 1, text: "Learn React" },
    { id: 2, text: "Build a Todo App" },
    { id: 3, text: "Deploy the App" },
  ];

  const handleAddTodo = async (data) => {
    console.log(data.todo);
    reset();
    const toSend = {
      todo: data.todo,
      email: session.user.email,
    };

    const resp = await fetch("http://localhost:3000/main/api", {
      method: "POST",
      body: JSON.stringify(toSend),
      headers: {
        "content-type": "application/json",
      },
      credentials: "same-origin",
    });
    if (resp.status === 200) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your data has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <header className="w-full text-center py-4">
        <h1 className="text-3xl font-bold text-gray-900">My Todo List</h1>
      </header>
      {session?.user?.email ? (
        <div>
          <div className="flex justify-center">
            <form
              onSubmit={handleSubmit(handleAddTodo)}
              className="flex w-full max-w-md mt-4"
            >
              <input
                type="text"
                {...register("todo", { required: true })}
                className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Add a new task..."
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
