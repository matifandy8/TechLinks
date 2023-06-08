import Image from "next/image";
import Paragraph from "@/components/ui/Paragraph";

import type { Metadata } from "next";
import LargeHeading from "@/components/ui/LargeHeading";

export const metadata: Metadata = {
  title: "Tech Link | Home",
  description: "Free & open-source TechLink",
};

export default function Home() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-x-hidden">
      <div className="container pt-44 max-w-7xl w-full mx-auto h-full">
        <div className="h-full gap-6 flex flex-col justify-start lg:justify-start items-center lg:items-start">
          <LargeHeading
            size="lg"
            className="three-d text-black dark:text-light-gold"
          >
            Share useful technology <br /> resources for their projects..
          </LargeHeading>

          <Paragraph className="max-w-xl lg:text-left">
            TechLink could be a useful tool for developers and app makers to
            keep track of and share useful technology resources for their
            projects.
          </Paragraph>

          <div className="relative w-full max-w-lg lg:max-w-2xl lg:left-1/2 aspect-square lg:absolute">
            <Image
              priority
              className="img-shadow "
              quality={100}
              style={{ objectFit: "contain" }}
              fill
              src="/programming.png"
              alt="programming"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
