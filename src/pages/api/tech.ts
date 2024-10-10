// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { mongooseConnect } from "@/lib/mongoose";
import { Tech } from "@/models/Tech";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "GET") {
    try {
      await mongooseConnect();
      console.log("MongoDB connected successfully!");

      const data = await Tech.find();
      console.log("Data fetched successfully:", data);

      res.status(200).json({
        statusCode: 200,
        status: true,
        message: "Fetch all Techs",
        data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ name: "Error" });
    }
  } else if (method === "POST") {
    try {
      await mongooseConnect();
      const data = await Tech.create(req.body);
      res.status(201).json({
        statusCode: 201,
        status: true,
        message: "Tech created successfully",
        data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ name: "Error" });
    }
  }
}
