// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import pool  from "../../../lib/db";
import fs from 'fs';
const VALID_API_KEY = process.env.API_KEY;

import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if(req.method === 'DELETE'){
    
    if (!session) {
      res.status(401).json({ message: "You must be logged in." });
      return;
    }
  const { id } = req.query;

    // Fetch the image file name from the database
    pool.query("SELECT image FROM posts WHERE id=?", [id], (error, results, fields) => {
      if (error) throw error;

      if (results.length > 0) {
        const imageName = results[0].image;
        // Delete the image file
        const imagePath = `public/image/${imageName}`;
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }

        // Delete the post from the database
        pool.query('DELETE FROM posts WHERE id = ?', [id], (error, results, fields) => {
          if (error) throw error;
          res.status(200).json(results);
        });
      } else {
        res.status(404).json({ message: `Post with ID ${id} not found` });
      }
    });
  }  
 else if(req.method === 'GET'){
    const { id,key } = req.query;
    
    if (key !== VALID_API_KEY) {
      res.status(401).json(
        { 
          error: {
            code: 403,
            message: "The request is missing a valid API key.",
            errors: [
                {
                message: "The request is missing a valid API key.",
                domain: "global",
                reason: "forbidden"
                }
            ],
            status: "PERMISSION_DENIED"
            }
        }
        );
      return;
    }

    // try {
        let dbQuery = "SELECT * FROM posts where slug=?";
        pool.query(dbQuery,[id], (error, results, fields) => {
          if (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred' });
          } else {
            res.status(200).json(results[0]);
          }
        });
        // } catch (error) {
        //   console.error(error);
        //   res.status(500).json({ error: 'An error occurred' });
        // }

 }else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

