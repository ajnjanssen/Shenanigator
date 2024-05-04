"use client";
import Link from "next/link";
import router from "next/router";
import React from "react";
import { useRouter } from "next/navigation";

function Terug() {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className="btn btn-primary w-fit">
      Terug
    </button>
  );
}

export default Terug;
