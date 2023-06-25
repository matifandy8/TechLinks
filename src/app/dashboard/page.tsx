import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LargeHeading from "@/components/ui/LargeHeading";
import SaveLinkForm from "@/components/SaveLinkForm";
import Paragraph from "@/components/ui/Paragraph";

export const metadata: Metadata = {
  title: "Tech Link | Dashboard",
  description: "Free & open-source TechLink",
};

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return notFound();

  return (
    <div className="relative h-screen flex items-center justify-center overflow-x-hidden">
      <div className="container pt-44 max-w-7xl w-full mx-auto h-full">
        <div className="h-full lg:items-center gap-6 flex flex-col justify-start lg:justify-start items-center lg:items-start">
          <LargeHeading
            size="lg"
            className="three-d text-black dark:text-light-gold"
          >
            Dashboard
          </LargeHeading>
          <Paragraph>Add a new link.</Paragraph>
          <SaveLinkForm />
        </div>
      </div>
    </div>
  );
};

export default page;
