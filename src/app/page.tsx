"use client";

import Image from "next/image";
import NewItem from "./components/ui/Shenanigan/submitShenanigan";
import Table from "./components/ui/Shenanigan/Table/Table";
import Modal from "./components/ui/modal/Modal"; // Ensure the correct import path

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/services/firebase";
import { useRouter } from "next/navigation";

export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div>
      <NewItem />

      <Table />
      <Modal />
    </div>
  );
}
