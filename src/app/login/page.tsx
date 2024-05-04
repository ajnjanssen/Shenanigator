"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "@/app/services/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Update this import for useRouter

function index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, , signInError] =
    useSignInWithEmailAndPassword(auth);
  const router = useRouter();
  const [user] = useAuthState(auth);

  const handleSignIn = async (event) => {
    event.preventDefault(); // Prevent the form from causing a page reload
    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (res) {
        setEmail(""); // Reset email state after successful login
        setPassword(""); // Reset password state after successful login
        router.push("/"); // Redirect to home page
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (user) {
    router.push("/");
    return null;
  }

  return (
    <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
      <div className="flex-col flex self-center p-10 sm:max-w-5xl xl:max-w-2xl z-10">
        <div className="self-start hidden lg:flex flex-col text-base-content">
          <img className="w-full" src="/logo.svg" alt="logo" />
        </div>
      </div>
      <div className="flex justify-center self-center z-10">
        <div className="p-12 bg-base-200 mx-auto rounded-2xl w-100 ">
          <form onSubmit={handleSignIn} className="space-y-5">
            <div className="mb-4">
              <h3 className="font-semibold text-2xl text-base-content">
                Inloggen
              </h3>
              <p>Maak een account aan</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium tracking-wide">Email</label>
              <input
                className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                type="email"
                placeholder="mail@vrijdagonline.nl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="mb-5 text-sm font-medium tracking-wide">
                Password
              </label>
              <input
                className="w-full content-center text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                placeholder="Geef een wachtwoord op"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Inloggen
            </button>
            <div>
              <Link href="/sign-up">
                <button className="w-full flex justify-center btn btn-ghost">
                  Account aanmaken
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default index;
