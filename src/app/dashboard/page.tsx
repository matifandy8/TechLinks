import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Tech Link | Dashboard",
  description: "Free & open-source TechLink",
};

const page = async () => {
  const user = await getServerSession(authOptions);
  if (!user) return notFound();

  console.log(user);

  return (
    <div className="">
      <h1>Dashboard</h1>
    </div>
  );
};

export default page;
