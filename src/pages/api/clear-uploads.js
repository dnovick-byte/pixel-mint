import fs from "fs";
import path from "path";

// API route to clear the uploads folder, where the images are stored
export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const uploadsDir = path.join(process.cwd(), "public/uploads"); // Adjust path as needed

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return res.status(500).json({ message: "Error reading directory" });
    }

    for (const file of files) {
      fs.unlink(path.join(uploadsDir, file), (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }

    return res.status(200).json({ message: "Uploads folder cleared" });
  });
}