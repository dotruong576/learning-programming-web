/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from 'react';
import useLogin from '~/hooks/auth/useLogin';

const LoginForm = () => {
  const { mutate } = useLogin();
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  return (
    <form className="flex h-fit w-2/3 flex-col items-center justify-center"
          onSubmit={(e) => {
            e.preventDefault(),
              mutate({
                password,
                email,
              });
          }}>
      <div className="h-fit select-none py-4 font-sans text-6xl font-bold text-black mb-8">
        pro<span className="text-blue-600">c</span>ode
      </div>
      {/*  */}
      <div className="mb-4 w-full space-y-4">
        <label className="flex w-full justify-start font-semibold">
          Email
        </label>
        <input
          type="email"
          className="h-12 w-full rounded-md pl-4 outline outline-2"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          required
        ></input>
      </div>
      {/*  */}
      <div className="mb-4 w-full space-y-4">
        <label className="flex w-full justify-start font-semibold">
          Password
        </label>
        <input
          type="password"
          className="h-12 w-full rounded-md pl-4 outline outline-2"
          placeholder="Input your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          required
        ></input>
      </div>
      {/*  */}
      <input
        type="submit"
        className="h-10 w-full font-bold rounded-full bg-blue-500 text-white transition-all hover:bg-blue-700 mt-12"
        value="Log in with ADMIN account"
      ></input>
    </form>
  );
}

export default LoginForm;