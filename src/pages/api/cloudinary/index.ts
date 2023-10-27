import type { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dpcglvg6o", // add your cloud_name
  api_key: "132176639719887", // add your api_key
  api_secret: "I9f7-4MCAxSTxNPi33MJliNXEKE", // add your api_secret
  secure: true,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const results = await cloudinary.search
    .expression(
      "systemdni*",
    )
    .sort_by("created_at", "desc")
    .execute();

  res.status(200).json({ results });
}
