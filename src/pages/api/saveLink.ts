import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    try {
      const { userId } = req.body;

      if (!userId) {
        return res
          .status(400)
          .json({ success: false, error: "Missing userId" });
      }

      const links = await prisma.link.findMany({
        where: { userId },
      });

      res.status(200).json({ success: true, links });
    } catch (error) {
      console.error("Error retrieving links:", error);
      res.status(500).json({ success: false, error: "Error retrieving links" });
    }
  } else if (req.method === "POST") {
    try {
      const { url, title, description } = req.body;
      const session = await getSession({ req });

      // Create a new link for the logged-in user
      const savedLink = await prisma.link.create({
        data: {
          url,
          title,
          description,
          userId: { id: session?.user?.id },
        },
      });

      res.status(201).json({ success: true, link: savedLink });
    } catch (error) {
      console.error("Error saving link:", error);
      res.status(500).json({ success: false, error: "Error saving link" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
