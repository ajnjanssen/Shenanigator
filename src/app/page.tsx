"use client";

import Image from "next/image";
import NewItem from "./components/ui/Shenanigan/submitShenanigan";
import Table from "./components/ui/Shenanigan/Table/Table";
import Divider from "./components/ui/divider/Divider";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/services/firebase";
import { useRouter } from "next/navigation";

export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  console.log(user);
  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div>
      <NewItem />
      <Divider />
      <Table />
    </div>
  );
}
