"use client";
import Terug from "@/app/components/ui/Terugknop/Terug";
import Heading from "@/app/components/ui/default/Heading";
import React from "react";
import Divider from "../../components/ui/divider/Divider";
import { useRouter } from "next/navigation";

interface UserDetailsProps {
  params: any;
}

function UserDetails({ params }: UserDetailsProps): JSX.Element {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4">
      <Terug />
      <Divider />
      <Heading title={params.userId} />
    </div>
  );
}

export default UserDetails;
