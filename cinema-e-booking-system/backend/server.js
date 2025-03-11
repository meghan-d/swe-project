import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import bcrypt from "bcrypt"

const app = express();
const PORT = 5000;

// Enable CORS to allow frontend access
app.use(cors());
app.use(express.json());
// Create a database connection
const db = await mysql.createConnection({
    host: "localhost",
    user: "root",        // Update if your DB user is different
    password: "Marmar3511@",        // Add your DB password if applicable
    database: "cinema_ebooking"
});

console.log("Connected to database"); // ✅ Debugging log

// Fetch movies
app.get("/movies", async (req, res) => {
    try {
        const result = await db.execute("SELECT * FROM movies"); 
        console.log("Raw DB Result:", result); // ✅ Debugging log

        // Fix the non-iterable error by extracting rows correctly
        const rows = result[0]; // ✅ MySQL2 returns an array with rows at index 0
        console.log("Fetched Movies:", rows); // ✅ Verify fetched movies

        res.json(rows); // ✅ Send correct JSON response
    } catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Add Users
app.post("/registeredusers", async (req,res) => {
    try {
        console.log("Received request body:", req.body)
        //console.log("Got here")
        const {name, email, password, phone, cardType, cardNumber, expirationDate,
            billingStreet, billingCity, billingState, billingZip, addressStreet, addressCity, addressState, addressZip} = req.body;
            
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const hashedCardType = await bcrypt.hash(String(cardType), saltRounds);
        const hashedCardNumber = await bcrypt.hash(String(cardNumber), saltRounds);
        const hashedExpirationDate = await bcrypt.hash(String(expirationDate), saltRounds);

        const sql = `INSERT INTO registeredusers (name, email, password, phone, cardType, cardNumber, expirationDate, 
            billingStreet, billingCity, billingState, billingZip, addressStreet, addressCity, addressState, addressZip) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [name, email, hashedPassword, phone, hashedCardType, hashedCardNumber, hashedExpirationDate, 
            billingStreet, billingCity, billingState, billingZip, addressStreet, addressCity, addressState, addressZip];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error("Error inserting user:", err);
                res.status(500).send("Error saving user to database");
            } else {
                res.send("User registered successfully!");
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal Server error"});
    }
});

//Decrypting, comparing for Login
app.post("/login", async (req, res) => {
    try {
        //console.log("Executing query for:", req.body.username);
            
        const sql = "SELECT * FROM registeredusers WHERE email = ?";
        const [result] = await db.query(sql, [req.body.username]);  
    
        //console.log("Query executed successfully:", result);
        if (result.length > 0) {
            const isMatch = await bcrypt.compare(req.body.password.toString(), result[0].password);
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
        return res.json({error: "Internal Server Error"});
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
