// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import pool  from "../../../lib/db";
var CryptoJS = require("crypto-js"); // encrypt the password


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      pool.query("SELECT * FROM users", [], (error, results, fields) => {
         if (error) throw error;
         res.status(200).json(results);
       });
     } catch (error) {
       console.error(error);
       res.status(500).json({ error: 'An error occurred' });
     }
  }else if(req.method === 'POST'){
        const{userName,emailAddress,password,role,userImage,displayName,accountStatus}= req.body;
          // Encrypt
      var ciphertext = CryptoJS.AES.encrypt(password, process.env.NEXT_AES_SECRET_KEY).toString();
     
        let dbQuery = "INSERT INTO users(userName,emailAddress,password,role,userImage,displayName,accountStatus) values(?,?,?,?,?,?,?)";
        pool.query(dbQuery,[userName,emailAddress,ciphertext,role,userImage,displayName,accountStatus],
          (error, results, fields) => {
         if (error) throw error;
         res.status(200).json(results);
       });
     
  }else if (req.method === 'PUT') {
    try {
        const{userName,emailAddress,password,role,userImage,displayName,accountStatus,userID}  = req.body;
      let dbQuery = "UPDATE users SET userName=?,emailAddress=?,password=?,role=?,userImage=?,displayName=?,accountStatus=? WHERE userID=?";
      pool.query(dbQuery, [userName,emailAddress,password,role,userImage,displayName,accountStatus,userID], (error, results, fields) => {
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

