import pool  from "../../../lib/db";

import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

const VALID_API_KEY = process.env.API_KEY;

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if(req.method === 'DELETE'){
    if (!session) {
      res.status(401).json({ message: "You must be logged in." });
      return;
    }
    const { id } = req.query;
    try {
      let dbQuery = "delete from categories where category_id=?"
      pool.query(dbQuery,[id]),
        (error, results, fields) => {
         if (error) throw error;
         res.status(200).json(results);
       }
     } catch (error) {
       console.error(error);
       res.status(500).json({ error: 'An error occurred' });
     }
    res.status(200).json({ message: `Deleted category with ID ${id}` });
  } else if(req.method === 'GET'){
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
 
    try {
    let dbQuery = "SELECT posts.id, posts.title, posts.keyword, posts.description, posts.slug, posts.published, posts.updated, posts.status, posts.content, posts.image, posts.authorID, categories.category_id, categories.category_name, categories.category_slug, users.displayName, users.userName, users.userImage \
    FROM posts \
    JOIN categories ON posts.category_id = categories.category_id \
    JOIN users ON posts.authorID = users.userID\
    WHERE categories.category_slug=?";
    pool.query(dbQuery,[id],
      (error, results, fields) => {
        if (error) throw error;
        // res.status(200).json(results);
        const formattedResults = results.map((result) => {
          return {
            id: result.id,
            title: result.title,
            keyword: result.keyword,
            description: result.description,
            slug: result.slug,
            published: result.published,
            updated: result.updated,
            status: result.status,
            content: result.content,
            image: result.image,
            category: {
              category_id: result.category_id,
              category_name: result.category_name,
              category_slug: result.category_slug,
            },
            author: {
              authorID: result.authorID,
              name: result.displayName,
              username: result.userName,
              image: result.userImage,
            }
          };
        });
        
      
        res.status(200).json(formattedResults);
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }

  }else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

