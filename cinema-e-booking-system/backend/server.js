import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";

const app = express();
const PORT = 5000;

// Enable CORS to allow frontend access
app.use(cors());

// Create a database connection
const db = await mysql.createConnection({
    host: "localhost",
    user: "root",        // Update if your DB user is different
    password: "Rajinara#12",        // Add your DB password if applicable
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

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
