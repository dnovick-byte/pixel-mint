import formidable from 'formidable'; // Library for parsing form data, especially files
import fs from 'fs'; // Node.js file system module for file operations
import path from 'path'; // Node.js path module for handling file paths

// This config is required for Next.js API routes that handle file uploads
// It disables the default body parser because we'll use formidable instead
export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
    // Only allow POST requests
    if (req.method === 'POST') {
        // Define where we want to save uploaded files
        // process.cwd() gets the current working directory (your project root)
        // This will create a full path like: /your/project/public/uploads
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');

        // Create the uploads directory if it doesn't exist
        try {
            fs.mkdirSync(uploadDir, { recursive: true });
        } catch (err) {
            return res.status(500).json({ error: 'Failed to create upload directory' });
        }

        // Configure formidable for file upload handling
        const form = formidable({
            uploadDir: uploadDir, // Where to save files
            keepExtensions: true, // Keep file extensions (.png, .jpg, etc)
            // Custom filename function to avoid naming conflicts
            filename: (name, ext) => `screenshot-${Date.now()}${ext}` // Creates names like screenshot-1234567890.png
        });
        
        // Parse the incoming request
        // This is where formidable processes the upload
        form.parse(req, (err, fields, files) => {
            // Handle any errors during upload
            if (err) {
                console.error('Upload error:', err);
                return res.status(500).json({ error: 'Failed to process image' });
            }

            // Check if we actually received a file
            // In your form, the file input must have name="file"
            if (!files.file || !files.file[0]) {
                return res.status(400).json({ error: 'No image data received' });
            }

            // Get the uploaded file details
            const file = files.file[0];

            // Create the public URL path
            // This is the path that will be accessible from the browser
            // If file.filepath is '/your/project/public/uploads/screenshot-123.png'
            // This will create '/uploads/screenshot-123.png'
            const relativePath = path.join('/uploads', path.basename(file.filepath));
            
            // Send back the success response with file paths
            res.status(200).json({ 
                success: true, 
                filePath: relativePath, // The public URL path to access the file
                fullPath: file.filepath // The actual location on the server (for debugging)
            });
        });
    } else {
        // Reject any non-POST requests
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}