"use client";
import Image from "next/image";
import React from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/services/firebase";
import { useState } from "react";
import Link from "next/link";
import { sign } from "crypto";
import { useRouter } from "next/navigation";
function index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();
  const [user] = useAuthState(auth);
  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      setEmail(""); // Fix: Update the 'email' state variable
      setPassword(""); // Fix: Update the 'password' state variable
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  if (user) {
    router.push("/");
    return null;
  }

  return (
    <div>
      <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
          <div className="self-start hidden lg:flex flex-col  text-base-content">
            <img className="w-full" src="/logo.svg" alt="logo" />
          </div>
        </div>
        <div className="flex justify-center self-center  z-10">
          <div className="p-12 bg-base-200 mx-auto rounded-2xl w-100 ">
            <div className="mb-4">
              <h3 className="font-semibold text-2xl text-base-content">
                Inloggen
              </h3>
              <p className="">Maak een account aan</p>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium tracking-wide">
                  Email
                </label>
                <input
                  className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  type="email"
                  placeholder="mail@vrijdagonline.nl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="mb-5 text-sm font-medium tracking-wide">
                  Password
                </label>
                <input
                  className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  placeholder="Geef een wachtwoord op"
                  type="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Fix: Update the 'password' state variable
                />
              </div>
              <div>
                <button
                  type="submit"
                  onClick={handleSignIn}
                  className="btn btn-primary w-full"
                >
                  Inloggen
                </button>
              </div>
              <div>
                <Link href="/sign-up">
                  <button className="w-full flex justify-center  btn btn-ghost">
                    Account aanmaken
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
