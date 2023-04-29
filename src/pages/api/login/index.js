import pool  from "../../../lib/db";
var jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");



export default function handler(req, res) {

    if (req.method === 'POST') { 
        const {emailAddress, password} = req.body;

        let dbQuery = "SELECT * FROM users WHERE emailAddress=?";
        pool.query(dbQuery,[emailAddress], (error, results, fields) => {
            if(error) {
                console.log("Error executing query:", error);
                res.status(500).json({ success:false, message: "Internal server error" });
                return;
            }

            if(results.length > 0) {
                console.log("User found in database:", results[0]);

                  // Decrypt
              var bytes  = CryptoJS.AES.decrypt(results[0].password, process.env.NEXT_AES_SECRET_KEY);
              var decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

                if(emailAddress === results[0].emailAddress && password === decryptedPassword) {
                    console.log("Login successful for emailAddress:", emailAddress);
                   
                    let msg = {
                        success:true,
                        message:"login successfull",
                        userName:results[0].userName,
                        email:results[0].emailAddress,
                    }
                    const token = jwt.sign(msg, process.env.NEXT_JWT_SECRET_KEY);
                    res.status(200).json({success:true, msg, token});
                } else {
                    console.log("Invalid credentials for emailAddress:", emailAddress);
                    res.status(200).json({success:false, message:"invalid credentials"});
                }
             } else {
                console.log("No user found for emailAddress:", emailAddress);
                res.status(200).json({success:false, message:"No User Found"});
             }
        });
    }else if(req.method === 'GET'){
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
    } else { 
        // Handle any other HTTP method
    }
}
