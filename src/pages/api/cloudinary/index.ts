import type { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";
import { env } from "@/env.mjs";

cloudinary.config({
  cloud_name: "dpcglvg6o", // add your cloud_name
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const results = (await cloudinary.search
    .expression("systemdni*")
    .sort_by("created_at", "desc")
    .execute()) as { resources: { secure_url: string }[] };

  res.status(200).json({ results });
}
