import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    try {
      const { userId } = req.query;

      // Check if userId is provided
      if (!userId) {
        return res
          .status(400)
          .json({ success: false, error: "Missing userId" });
      }

      // Retrieve all links for the provided userId
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
      const { url, title, description, userId } = req.body;

      const savedLink = await prisma.link.create({
        data: {
          url,
          title,
          description,
          userId: userId,
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
