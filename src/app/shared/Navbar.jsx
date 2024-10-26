"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
          </div>
          <a className="btn btn-ghost text-xl">TO DO List</a>
        </div>
        <div className="navbar-end">
          {session ? <a className="btn">{session.user.email}</a> : ""}
          {session ? (
            <button
              className="btn btn-error text-white"
              onClick={() => signOut()}
            >
              Logout
            </button>
          ) : (
            <Link href={"/"}>
              {" "}
              <button className="btn btn-success text-white">Home</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
