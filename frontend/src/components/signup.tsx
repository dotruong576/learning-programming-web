/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState, FormEvent } from "react";
export default function SignUp() {
  return (
    <form className="flex h-fit w-3/5 flex-col items-center justify-center ">
      <div className="h-fit select-none py-4 font-sans text-5xl font-bold text-black">
        pro<span className="text-blue-600">c</span>ode
      </div>
      {/*  */}
      <div className="mb-4 w-full space-y-2">
        <label className="flex w-full justify-start font-semibold">
          Username
        </label>
        <input
          type="email"
          className="h-12 w-full rounded-md pl-4 outline outline-2"
          placeholder="example@email.com"
        ></input>
      </div>
      {/*  */}
      <div className="mb-4 w-full space-y-2">
        <label className="flex w-full justify-start font-semibold">
          Password
        </label>
        <input
          type="password"
          className="h-12 w-full rounded-md pl-4 outline outline-2"
          placeholder="Input your password"
        ></input>
      </div>
      {/*  */}
      <div className="mb-4 w-full space-y-2">
        <label className="flex w-full justify-start font-semibold">
          Re-type Password
        </label>
        <input
          type="password"
          className="h-12 w-full rounded-md pl-4 outline outline-2"
          placeholder="Input your password again"
        ></input>
      </div>
      {/*  */}
      <input
        type="submit"
        className="h-10 w-full  rounded-full bg-blue-500 text-white transition-all hover:bg-blue-700"
        value="Sign up"
      ></input>
      {/*  */}
      <div className="mt-2 flex w-full flex-row justify-between">
        <div>Have an account?</div>
        <a
          className="font-bold text-blue-500 hover:cursor-pointer hover:text-blue-700"
          href="signin"
        >
          Sign in
        </a>
      </div>
    </form>
  );
}
