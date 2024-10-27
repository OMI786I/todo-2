"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();
const Main = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { data: session } = useSession();
  const [todo, setTodo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodoId, setCurrentTodoId] = useState(null);

  const modalForm = useForm(); // Separate form state for the modal

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(
        `https://todo-2-omega.vercel.app/main/api/${session.user.email}`
      ).then((res) => res.json()),
  });

  const openModal = (id, todoText) => {
    setCurrentTodoId(id);
    modalForm.setValue("todo", todoText); // Set initial value in modal form
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    modalForm.reset();
  };

  const handleDelete = async (id) => {
    console.log(id);
    const deleted = await fetch(
      `https://todo-2-omega.vercel.app/main/api/id/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const resp = await deleted.json();
    if (resp?.response?.deletedCount > 0) {
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your data has been deleted",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleAddTodo = async (data) => {
    const toSend = {
      todo: data.todo,
      email: session.user.email,
    };

    const resp = await fetch("https://todo-2-omega.vercel.app/main/api", {
      method: "POST",
      body: JSON.stringify(toSend),
      headers: {
        "content-type": "application/json",
      },
      credentials: "same-origin",
    });
    if (resp.status === 200) {
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your data has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
    }
  };

  const handleUpdateTodo = async (formData) => {
    const updatedData = { todo: formData.todo, email: session.user.email };
    const resp = await fetch(
      `https://todo-2-omega.vercel.app/main/api/id/${currentTodoId}`,
      {
        method: "PATCH",
        body: JSON.stringify(updatedData),
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      }
    );
    if (resp.status === 200) {
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your data has been updated",
        showConfirmButton: false,
        timer: 1500,
      });
      closeModal(); // Close modal after successful update
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
              {data && data.myData.length > 0 ? (
                data.myData.map((res) => (
                  <li
                    key={res._id}
                    className="flex justify-between items-center p-2 bg-white rounded-md shadow"
                  >
                    <span className="text-gray-800">{res.todo}</span>
                    <button
                      onClick={() => handleDelete(res._id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => openModal(res._id, res.todo)}
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      Update
                    </button>
                  </li>
                ))
              ) : (
                <span>Add task to see here</span>
              )}
            </ul>
          </div>
          {isModalOpen && (
            <dialog id="my_modal_1" className="modal" open>
              <div className="modal-box">
                <h3 className="font-bold text-lg">Update Todo</h3>
                <form onSubmit={modalForm.handleSubmit(handleUpdateTodo)}>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                      Update task
                    </label>
                    <input
                      type="text"
                      {...modalForm.register("todo", {
                        required: "This field is required",
                      })}
                      className="input input-bordered w-full"
                      placeholder="Update your task"
                    />
                    {modalForm.formState.errors.todo && (
                      <p className="text-red-500 text-sm mt-1">
                        {modalForm.formState.errors.todo.message}
                      </p>
                    )}
                  </div>

                  <div className="modal-action">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                    <button type="button" onClick={closeModal} className="btn">
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </dialog>
          )}
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
