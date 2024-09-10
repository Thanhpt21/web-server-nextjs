import type { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';
import fs from 'fs';

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cấu hình để `formidable` xử lý tệp tải lên
export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'Error parsing the files' });
      return;
    }

    try {
      // Kiểm tra xem `files.file` có tồn tại và có ít nhất một tệp không
      if (Array.isArray(files.file) && files.file.length > 0) {
        const file = files.file[0];
        if (file.filepath) {
          const result = await cloudinary.uploader.upload(file.filepath);
          res.status(200).json({ secure_url: result.secure_url });
        } else {
          res.status(400).json({ error: 'File path is missing' });
        }
      } else {
        res.status(400).json({ error: 'No files uploaded' });
      }
    } catch (uploadError) {
      res.status(500).json({ error: 'Error uploading to Cloudinary' });
    }
  });
};

export default handler;
