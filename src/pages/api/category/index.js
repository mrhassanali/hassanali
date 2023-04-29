// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import pool  from "../../../lib/db";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

const VALID_API_KEY = process.env.API_KEY;

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === 'GET') { 

    const {key } = req.query;

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

    try {
      pool.query("SELECT * FROM categories", [], (error, results, fields) => {
         if (error) throw error;
         res.status(200).json(results);
       });
     } catch (error) {
       console.error(error);
       res.status(500).json({ error: 'An error occurred' });
     }
     // End the connection after handling the query
    //  pool.end();
  }else if(req.method === 'POST'){
    if (!session) {
      res.status(401).json({ message: "You must be logged in." });
      return;
    }

    try {
      const{categoryName,categorySlug}= req.body;
      let dbQuery = "INSERT INTO categories(category_name,category_slug) values(?,?)"
        pool.query(dbQuery,[categoryName,categorySlug]),
          (error, results, fields) => {
         if (error) throw error; 
         res.status(200).json(results);
       }
     } catch (error) {
       console.error(error);
       res.status(500).json({ error: 'An error occurred' });
     }
  }else if (req.method === 'PUT') {
    if (!session) {
      res.status(401).json({ message: "You must be logged in." });
      return;
    }
    try {
      const { categoryID, categoryName, categorySlug } = req.body;
      let dbQuery = "UPDATE categories set category_name=?,category_slug=? where category_id=?"
      pool.query(dbQuery, [categoryName, categorySlug, categoryID], (error, results, fields) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: 'An error occurred' });
        } else {
          res.status(200).json({ message: `Updated this category with ID ${categoryID}` });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

