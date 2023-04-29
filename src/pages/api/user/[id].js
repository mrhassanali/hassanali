 // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
 import pool  from "../../../lib/db";

export default async function handler(req, res) {
  if(req.method === 'DELETE'){
    const { id } = req.query;
    try {
      let dbQuery = "delete from users where userID=?"
      pool.query(dbQuery,[id]),
        (error, results, fields) => {
         if (error) throw error;
         res.status(200).json(results);
       }
     } catch (error) {
       console.error(error);
       res.status(500).json({ error: 'An error occurred' });
     }
    res.status(200).json({ message: `Deleted user with ID ${id}` });
  } else if(req.method === 'GET'){
    const { id } = req.query;
    try {
    let dbQuery = "SELECT * FROM users where userID=?";
    pool.query(dbQuery,[id],
      //callback function
      (error, results, fields) => {
        if (error) throw error;
        res.status(200).json(results);
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }

  }else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

