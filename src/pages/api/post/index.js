// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import pool  from "../../../lib/db";

const VALID_API_KEY = process.env.API_KEY;

export default async function handler(req, res) {
  const { key } = req.query; 
  if (req.method === 'GET') {
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
      pool.query("SELECT posts.id,posts.title,posts.keyword,posts.description,posts.slug,posts.published,posts.updated,posts.status,posts.content,posts.image,posts.authorID,users.displayName,users.userName,users.userImage,categories.category_id,categories.category_name,categories.category_slug FROM posts JOIN categories ON posts.category_id = categories.category_id JOIN users ON posts.authorID = users.userID", [], (error, results, fields) => {
        if (error) {
          res.status(500).json({ error: 'failed to load data' });
        } else {
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
        }
      });
    } catch (err) {
      res.status(500).json({ error: 'failed to load data' });
    }
  }
}