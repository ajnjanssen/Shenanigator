"use client";

import React from "react";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { auth } from "@/app/services/firebase";
import { useRouter } from "next/navigation";

function navbar() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  if (user) {
    return (
      <div className="navbar bg-base-200 flex justify-center">
        <div className="w-3/4">
          <div className="flex-1">
            <Link
              className=" text-xl p-0 flex gap-4 items-center font-bold text-white"
              href="/"
              replace
            >
              Shenanigator
            </Link>
          </div>
          <div className="flex-none gap-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href="/user" replace>
                    Mijn profiel
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/settings">Instellingen</Link>
                </li>
                <li>
                  <button onClick={() => signOut(auth)}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default navbar;
