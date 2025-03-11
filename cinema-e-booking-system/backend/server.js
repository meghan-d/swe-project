// import express from "express";
// import mysql from "mysql2/promise";
// import cors from "cors";
// import bcrypt from "bcrypt";


// const app = express();
// const PORT = 5000;

// // Enable CORS to allow frontend access
// app.use(cors());
// app.use(express.json());

// // Create a database connection
// const connectDB = async () => {
//     try {
//         const db = await mysql.createConnection({
//             host: "localhost",
//             user: "root", // Update if your DB user is different
//             password: "Rajinara#12", // Update with your DB password
//             database: "cinema_ebooking"
//         });
//         console.log("Connected to database");
//         return db;
//     } catch (error) {
//         console.error("Database connection failed:", error);
//         process.exit(1);
//     }
// };

// const db = await connectDB();

// // Fetch movies
// app.get("/movies", async (req, res) => {
//     try {
//         const [rows] = await db.execute("SELECT * FROM movies"); 
//         res.json(rows);
//     } catch (error) {
//         console.error("Error fetching movies:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// // Add Users
// app.post("/registeredusers", async (req, res) => {
//     try {
//         console.log("Received request body:", req.body);

//         const { name, email, password, phone, cardType, cardNumber, expirationDate,
//             billingStreet, billingCity, billingState, billingZip,
//             addressStreet, addressCity, addressState, addressZip } = req.body;

//         // Convert expirationDate from 'YYYY-MM' to 'YYYY-MM-DD' format
//         const formattedExpirationDate = expirationDate.length === 7 ? `${expirationDate}-01` : expirationDate;

//         // Hash only the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Insert into database
//         const sql = `INSERT INTO registeredusers (name, email, password, phone, cardType, cardNumber, expirationDate, 
//             billingStreet, billingCity, billingState, billingZip, addressStreet, addressCity, addressState, addressZip) 
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//         const values = [name, email, hashedPassword, phone, cardType, cardNumber, formattedExpirationDate, 
//             billingStreet, billingCity, billingState, billingZip, addressStreet, addressCity, addressState, addressZip];

//         await db.execute(sql, values);

//         res.send("User registered successfully!");
//     } catch (error) {
//         console.error("Error inserting user:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });


// // Login: Compare password
// app.post("/login", async (req, res) => {
//     try {
//         const sql = "SELECT * FROM registeredusers WHERE email = ?";
//         const [result] = await db.execute(sql, [req.body.username]);

//         if (result.length > 0) {
//             const isMatch = await bcrypt.compare(req.body.password.toString(), result[0].password);
//             if (isMatch) {
//                 return res.json({ Status: "Success" });
//             } else {
//                 return res.json({ Error: "Password does not match the email" });
//             }
//         } else {
//             return res.json({ Error: "No email associated with an account" });
//         }
//     } catch (error) {
//         console.error("Error fetching login info:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });


import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

const app = express();
const PORT = 5000;

// Enable CORS to allow frontend access
app.use(cors());
app.use(express.json());

// Create a database connection
const connectDB = async () => {
    try {
        const db = await mysql.createConnection({
            host: "localhost",
            user: "root", // Update if your DB user is different
            password: "Rajinara#12", // Update with your DB password
            database: "cinema_ebooking"
        });
        console.log("Connected to database");
        return db;
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};

const db = await connectDB();


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pranavisp2004@gmail.com",
      pass: "mnwu nkse hnic kxps", // Use App Password generated for Gmail
    },
    tls: {
      rejectUnauthorized: false, // Disable SSL certificate validation
    },
  });
  


// Fetch movies
app.get("/movies", async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM movies"); 
        res.json(rows);
    } catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Register User (with Email Verification)
app.post("/registeredusers", async (req, res) => {
    try {
        console.log("Received request body:", req.body);

        const { name, email, password, phone, cardType, cardNumber, expirationDate,
            billingStreet, billingCity, billingState, billingZip,
            addressStreet, addressCity, addressState, addressZip } = req.body;

        // Convert expirationDate from 'YYYY-MM' to 'YYYY-MM-DD' format
        const formattedExpirationDate = expirationDate.length === 7 ? `${expirationDate}-01` : expirationDate;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a 6-digit verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000);

        // Insert user with verification code (unverified initially)
        const sql = `INSERT INTO registeredusers (name, email, password, phone, cardType, cardNumber, expirationDate, 
            billingStreet, billingCity, billingState, billingZip, addressStreet, addressCity, addressState, addressZip, verificationCode, isVerified) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`;

        const values = [name, email, hashedPassword, phone, cardType, cardNumber, formattedExpirationDate, 
            billingStreet, billingCity, billingState, billingZip, addressStreet, addressCity, addressState, addressZip, verificationCode];

        await db.execute(sql, values);

        // Send email with verification code
        const mailOptions = {
            from: "pranavisp2004@gmail.com", // 🔴 Replace with your email
            to: email,
            subject: "Verify Your Account",
            text: `Your verification code is: ${verificationCode}`
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: "User registered! Verification email sent." });
    } catch (error) {
        console.error("Error inserting user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Verify Email (User enters the code received)
app.post('/verify-email', async (req, res) => {
    const { email, verificationCode } = req.body;
  
    // Check if email and verification code are provided
    if (!email || !verificationCode) {
      return res.status(400).json({ message: "Both email and verification code are required." });
    }
  
    try {
      // Log to debug
      console.log(`Verifying email: ${email}, with code: ${verificationCode}`);
  
      // Query the database for the email and verification code
      const query = "SELECT * FROM registeredusers WHERE email = ? AND verificationCode = ?";
      const [rows] = await db.execute(query, [email, verificationCode]);
  
      if (rows.length > 0) {
        // If user found and verification code matches, update the user status to verified
        const updateQuery = "UPDATE registeredusers SET isVerified = true WHERE email = ?";
        await db.execute(updateQuery, [email]);
  
        res.json({ message: "Email verified successfully!" });
      } else {
        res.status(400).json({ message: "Invalid verification code." });
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
// Login (Only if the user is verified)
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const [result] = await db.execute("SELECT * FROM registeredusers WHERE email = ?", [username]);

        if (result.length > 0) {
            if (result[0].isVerified === 0) {
                return res.status(403).json({ error: "Email not verified. Please check your email." });
            }

            const isMatch = await bcrypt.compare(password.toString(), result[0].password);
            if (isMatch) {
                return res.json({ Status: "Success" });
            } else {
                return res.json({ Error: "Password does not match the email" });
            }
        } else {
            return res.json({ Error: "No email associated with an account" });
        }
    } catch (error) {
        console.error("Error fetching login info:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
