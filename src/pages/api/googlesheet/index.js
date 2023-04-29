import { GoogleApis } from "googleapis";
import {google} from "googleapis";

const VALID_API_KEY = process.env.API_KEY;

export default async function handler(req, res) {
 if (req.method === 'POST') {    
  const { key } = req.query; 

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

        let body = req.body;

        const auth = new google.auth.GoogleAuth({
            credentials:{
                client_email:process.env.GOOGLE_CLIENT_EMAIL,
                private_key:process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
            },
            scopes:[
                "https://www.googleapis.com/auth/spreadsheets",
                "https://www.googleapis.com/auth/drive",
                "https://www.googleapis.com/auth/drive.file"

            ]
        });

        const sheets = google.sheets({
            auth,
            version:'v4'
        });

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId:process.env.GOOGLE_SHEET_ID,
            range:"A1:D1",
            valueInputOption:'USER_ENTERED',
            requestBody:{
                values:[
                    [body.name, body.email, body.message, body.address]
                ]
            }
        })
       
        return res.status(200).json({data:response.data});
      // } catch (error) {
      //   console.log(error)
      //   res.status(500).send({message:'Something Went Wrong'});
      // }
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  }
  