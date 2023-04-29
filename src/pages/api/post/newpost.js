import pool  from "../../../lib/db";
import multer from 'multer';
import path from "path";
import nc from "next-connect";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export const config = {
  api: {
    bodyParser: false,
  },
}

const upload = multer({
  storage:multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(process.cwd(), "public", "image"));
    },
    filename: function (req, file, cb) {
      cb(null, new Date().getTime() + '-' + file.originalname);
    }
  })
});

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});

handler.use(async (req, res, next) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
  next();
});

handler.use(upload.single('image')).post((req, res) => {
  const image = req.file.filename; // Uploaded Image Name with extension
  const { title, keyword, description, slug, status, content, category_id, authorID } = req.body;
  let dbQuery = "INSERT INTO posts(title, keyword, description, slug, status, content, image, category_id, authorID) values(?,?,?,?,?,?,?,?,?)"
  pool.query(dbQuery, [title, keyword, description, slug, status, content, image, category_id, authorID], (error, results, fields) => {
    if (error) throw error;
    res.status(200).json(results);
  });

  res.status(201).json({ filename: req.file.filename,data:req.body });
}).get((req, res) => {
  res.status(200).send("Hello world");
});

export default handler;
