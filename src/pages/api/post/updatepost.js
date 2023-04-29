import pool  from "../../../lib/db";
import multer from 'multer';
import nc from "next-connect";
import path from "path";
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
}

const upload = multer({
  storage: multer.diskStorage({
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
})
.use(upload.single('image'))
.post((req, res) => {
  const { id, title, keyword, description, slug, status, content, category_id } = req.body;

  let image;
  if (req.file) {
    // If a new image is uploaded, delete the old image and set the new image name
    pool.query("SELECT image FROM posts WHERE id=?", [id], (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        if (results.length > 0) {
          const imageName = results[0].image;
          const imagePath = `public/image/${imageName}`;
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        }
      }
    });
    image = req.file.filename;
  } else {
    // If no new image is uploaded, get the current image name from the database
    image = req.body.image;
  }

  const updated = new Date().toISOString();
  const dbQuery = "UPDATE posts SET title=?, keyword=?, description=?, slug=?, status=?, updated=?, content=?, image=?, category_id=? WHERE id=?";
  pool.query(dbQuery, [title, keyword, description, slug, status, updated, content, image, category_id, id], (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.status(200).json(results[0]);
    }
  });

  res.status(201).json({ filename: req.file?.filename, data:req.body });
})
.get((req, res) => {
  res.status(200).send("Hello world");
});

export default handler;
