// import type { NextApiRequest, NextApiResponse } from "next";
// import nodemailer from "nodemailer";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const { to, subject, body } = req.body;

//   if (!to || !subject || !body) {
//     return res.status(400).json({ error: "Missing parameters" });
//   }

//   try {
//     const transporter = nodemailer.createTransport({
//       host: "smtp.office365.com", 
//       port: 587,
//       secure: false, 
//       auth: {
//         user: "mostafa-for-work@hotmail.com", 
//         pass: "yasmin2132018##",         
//       },
//     });

//     await transporter.sendMail({
//       from: `"TACT Shop" <mostafa-for-work@hotmail.com>`, 
//       to,    
//       subject,
//       text: body,
//     });

//     res.status(200).json({ success: true });
//   } catch (err) {
//     console.error("💥 Nodemailer Error:", err);
//     res.status(500).json({ error: "Failed to send email" });
//   }
// }
