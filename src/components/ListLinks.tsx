"use client";

import { useEffect, useState } from "react";
import Paragraph from "./ui/Paragraph";

interface Link {
  id: number;
  title: string;
  url: string;
  description: string;
}

interface Data {
  links: Link[];
}

const ListLinks = ({ id }: { id: number }) => {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/saveLink?userId=${id}`)
      .then((res) => res.json())
      .then((data: Data) => {
        setData(data);
      });
  }, [id]);

  return (
    <div className="w-full md:w-1/2 px-3 mb-4">
      <Paragraph>List of Links</Paragraph>
      <ul className="space-y-4">
        {data?.links.map((link: Link) => (
          <li key={link.id} className="border border-gray-300 p-4 rounded-md">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {link.title}
            </a>
            <p className="text-gray-500">{link.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListLinks;
