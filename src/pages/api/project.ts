// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { mongooseConnect } from "@/lib/mongoose";
import { Project } from "@/models/Project";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "GET") {
    try {
      await mongooseConnect();

      const data = await Project.find();

      res.status(200).json({
        statusCode: 200,
        status: true,
        message: "Fetch all Projects",
        data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ name: "Error" });
    }
  } else if (method === "POST") {
    try {
      await mongooseConnect();
      const data = await Project.create(req.body);
      res.status(201).json({
        statusCode: 201,
        status: true,
        message: "Project created successfully",
        data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ name: "Error" });
    }
  }
}
