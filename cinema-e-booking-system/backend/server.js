import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import crypto from 'crypto';

const app = express();
const PORT = 5001;

// Enable CORS to allow frontend access
app.use(cors());
app.use(express.json());

// Create a database connection
const connectDB = async () => {
    try {
        const db = await mysql.createConnection({
            host: "localhost",
            user: "root", // Update if your DB user is different
            password: "", // Update with your DB password..Marmar3511@
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
      user: "marlym2882@gmail.com",
      //pass: "mnwu nkse hnic kxps", // Use App Password generated for Gmail - Pranavi's password
      pass: "eotd gwxz tpfn kbic", // Marly's Password
    },
    tls: {
      rejectUnauthorized: false, // Disable SSL certificate validation
    },
  });
  
const verificationCodes = {}; // Store email -> code mappings


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


//constant iv 
const ivBuffer = 'a1b2c3d4e5f67890extra'; 
const iv = Buffer.from(ivBuffer.slice(0, 16), 'utf8')

app.post("/register", async (req, res) => {
    try {
        console.log("Received request body:", req.body);

        const { name, email, password, phone, cards,
                addressStreet, addressCity, addressState, addressZip, promotions } = req.body;
        
        //checking if the email already has an account associated with it
        const emailCheckQuery = "SELECT * FROM registeredusers WHERE email = ?";
        const [existingEmail] = await db.execute(emailCheckQuery, [email]);
        if (existingEmail.length > 0) {
            // Email already exists in the database
            return res.status(400).json({ message: "Email already registered, please login or use a different email address." });
        }

        //checking if the phone number already has an account associated with it
        const phoneNumberCheckQuery = "SELECT * FROM registeredusers WHERE phone = ?"
        const [existingPhone] = await db.execute (phoneNumberCheckQuery, [phone]);
        if (existingPhone.length > 0) {
            return res.status(400).json({ message: "Phone number already registered, please login or use a different phone number."});
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);        

        // Generate a 6-digit verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000);

        const status = 'Inactive'
        //const userRole = (email.includes('@cebsadmin.com') && password.includes('cebsadmin')) ? 'Admin' : 'Customer' ;
        const userRole = (password.includes('cebsadmin') ? 'Admin' : 'Customer');

        // Insert user with verification code (unverified initially)
        const userInsertQuery = `INSERT INTO registeredusers (name, email, password, phone, addressStreet, 
                                 addressCity, addressState, addressZip, promotions, userRole, status, verificationCode) 
                                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const userValues = [name, email, hashedPassword, phone, addressStreet, addressCity, addressState, 
                            addressZip, promotions ? 1 : 0, userRole, status, verificationCode];

        // insert user into the db
        const [userResult] = await db.execute(userInsertQuery, userValues);
        const userId = userResult.insertId;
        
        //inserting cards into the db 
        if (cards.length > 0) {
            const cardInsertQuery = `INSERT INTO paymentcard (cardNumber, cardType, formatedExpirationDate, billingStreet, 
                                     billingCity, billingState, billingZip, userId) 
                                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            for (let i = 0; i < cards.length; i++) {
                // Individual cipher for each section
                var cardNumberCipher = crypto.createCipheriv('aes-128-cbc', 'mycardinfo'.padEnd(16, '0'), iv);
                var cardTypeCipher = crypto.createCipheriv('aes-128-cbc', 'mycardinfo'.padEnd(16, '0'), iv);
                var billingStreetCipher = crypto.createCipheriv('aes-128-cbc', 'mycardinfo'.padEnd(16, '0'), iv);
                var billingCityCipher = crypto.createCipheriv('aes-128-cbc', 'mycardinfo'.padEnd(16, '0'), iv);
                var billingStateCipher = crypto.createCipheriv('aes-128-cbc', 'mycardinfo'.padEnd(16, '0'), iv);
                var billingZipCipher = crypto.createCipheriv('aes-128-cbc', 'mycardinfo'.padEnd(16, '0'), iv);
                var expirationDateCipher = crypto.createCipheriv('aes-128-cbc', 'mycardinfo'.padEnd(16, '0'), iv);

                const formattedExpirationDate = cards[i].expirationDate.length === 7 ? `${cards[i].expirationDate}-01` : cards[i].expirationDate;

                //hashing cardnumber
                var hashedCardNumber = cardNumberCipher.update(cards[i].cardNumber, 'utf8', 'hex')
                hashedCardNumber += cardNumberCipher.final('hex')
                //hashing cardType
                var hashedCardType = cardTypeCipher.update(cards[i].cardType, 'utf8', 'hex')
                hashedCardType += cardTypeCipher.final('hex')
                //hashing card expiration date
                var hashedExpirationDate = expirationDateCipher.update(formattedExpirationDate, 'utf8', 'hex')
                hashedExpirationDate += expirationDateCipher.final('hex')
                //hashing billingStreet
                var hashedBillingStreet = billingStreetCipher.update(cards[i].billingStreet, 'utf8', 'hex')
                hashedBillingStreet += billingStreetCipher.final('hex')
                //hashing billingCity
                var hashedBillingCity = billingCityCipher.update(cards[i].billingCity, 'utf8', 'hex')
                hashedBillingCity += billingCityCipher.final('hex')
                //hashing billingState
                var hashedBillingState = billingStateCipher.update(cards[i].billingState, 'utf8', 'hex')
                hashedBillingState += billingStateCipher.final('hex')
                //hashing billingZip
                var hashedBillingZip = billingZipCipher.update(cards[i].billingZip, 'utf8', 'hex')
                hashedBillingZip += billingZipCipher.final('hex')

                const cardValues = [hashedCardNumber, hashedCardType, hashedExpirationDate, 
                        hashedBillingStreet, hashedBillingCity, hashedBillingState, hashedBillingZip, userId];
                await db.execute(cardInsertQuery, cardValues);
            }
        }
        // Send email with verification code
        const mailOptions = {
            from: "marlym2882@gmail.com", // Replace with your email
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
        const updateQuery = "UPDATE registeredusers SET status = 'Active' WHERE email = ?";
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
  

app.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Query the database for the user by email (username)
      const [result] = await db.execute("SELECT * FROM registeredusers WHERE email = ?", [username]);
  
      if (result.length > 0) {
        if (result[0].isVerified === 0) {
          return res.status(403).json({ error: "Email not verified. Please check your email." });
        }
  
        // Compare the provided password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password.toString(), result[0].password);
        if (isMatch) {
          // Query the database for the payment cards associated with the user
          const [paymentCards] = await db.execute("SELECT * FROM paymentcard WHERE userID = ?", [result[0].id]);
          // Prepare the user data to be sent in the response
          const user = {
            id: result[0].id,
            name: result[0].name,
            email: result[0].email,
            phone: result[0].phone,  
            street: result[0].addressStreet,
            city: result[0].addressCity,
            state: result[0].addressState,
            zip: result[0].addressZip,
            promotions: result[0].promotions,
            paymentCards: paymentCards,  // Include the user's payment cards
          };
  
          // Send success response with user data
          return res.json({
            Status: "Success",
            user: user,  // Include the user object in the response
          });
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
  
// Route to Send Reset Code
app.post("/send-reset-code", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit code

    // Store the code with the current timestamp
    verificationCodes[email] = {
        code: verificationCode,
        timestamp: Date.now(), // Store the time the code was generated
    };

    console.log(`Verification code for ${email}: ${verificationCode}`); // Debugging

    // Email Content
    const mailOptions = {
        from: "pranavisp2004@gmail.com", // Your email address
        to: email,                    // Recipient email
        subject: "Password Reset Verification Code",
        text: `Your password reset verification code is: ${verificationCode}. This code is valid for 10 minutes.`,
    };

    // Send Email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            return res.status(500).json({ error: "Error sending verification email" });
        }
        console.log("Email sent:", info.response);
        res.json({ message: "Verification code sent to email" });
    });
});

//Route to Verify the Code
app.post("/verify-reset-code", (req, res) => {
    const { email, verificationCode } = req.body;

    // Check if email is valid and code exists
    if (!email || !verificationCode) {
        return res.status(400).json({ error: "Email and verification code are required" });
    }

    const storedCode = verificationCodes[email];

    // Check if a verification code exists for the email
    if (!storedCode) {
        return res.status(400).json({ error: "Invalid verification code" });
    }

    // Check if the verification code has expired (10 minutes)
    const currentTime = Date.now();
    const timeDifference = currentTime - storedCode.timestamp;

    if (timeDifference > 600000) {  // 10 minutes (10 * 60 * 1000 milliseconds)
        delete verificationCodes[email];  // Remove the expired code
        return res.status(400).json({ error: "Verification code has expired" });
    }

    // Check if the verification code matches
    if (parseInt(verificationCode) === storedCode.code) {
        return res.json({ message: "Verification successful. You can reset your password." });
    } else {
        return res.status(400).json({ error: "Invalid verification code" });
    }
});

app.post("/reset-password", async (req, res) => {
    const { email, verificationCode, newPassword } = req.body;

    // Check if email, verification code, and new password are provided
    if (!email || !verificationCode || !newPassword) {
        return res.status(400).json({ error: "Email, verification code, and new password are required" });
    }

    const storedCode = verificationCodes[email];

    // Check if a verification code exists for the email
    if (!storedCode) {
        return res.status(400).json({ error: "Invalid verification code" });
    }

    // Check if the verification code has expired (10 minutes)
    const currentTime = Date.now();
    const timeDifference = currentTime - storedCode.timestamp;

    if (timeDifference > 600000) {  // 10 minutes (10 * 60 * 1000 milliseconds)
        delete verificationCodes[email];  // Remove the expired code
        return res.status(400).json({ error: "Verification code has expired" });
    }

    // Check if the verification code matches
    if (parseInt(verificationCode) === storedCode.code) {
        try {
            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Update the password in the database
            const updateQuery = "UPDATE users SET password = ? WHERE email = ?";
            await db.execute(updateQuery, [hashedPassword, email]);

            // Optionally, remove the code after successful reset
            delete verificationCodes[email];

            return res.json({ message: "Password reset successfully!" });
        } catch (error) {
            console.error("Error resetting password:", error);
            return res.status(500).json({ error: "Failed to reset password" });
        }
    } else {
        return res.status(400).json({ error: "Invalid verification code" });
    }
});

const decryptValue = (encryptedValue) => {
    try {
        const decipher = crypto.createDecipheriv('aes-128-cbc', 'mycardinfo'.padEnd(16, '0'), iv);
        var decrypted = decipher.update(encryptedValue, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (err) {
        console.error('Decryption error:', err);
        return 'Error decrypting';
    }
};

app.get('/edit-profile', async (req, res) => {
    const userId = req.query.userId; // Get the userId from query parameter
    console.log('Received request to edit profile with userId:', userId);  // This will print to the console

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        // Query the database for the user data
        const [userResults] = await db.execute('SELECT * FROM registeredusers WHERE id = ?', [userId]);

        if (userResults.length > 0) {
            // Query the database for the payment cards associated with the user
            const [paymentCards] = await db.execute('SELECT * FROM paymentcard WHERE userID = ?', [userId]);


            const decryptedCards = paymentCards.map(card => ({
                cardType: decryptValue(card.cardType),
                cardNumber: decryptValue(card.cardNumber),
                expirationDate: decryptValue(card.formatedExpirationDate),
                billingStreet: decryptValue(card.billingStreet),
                billingCity: decryptValue(card.billingCity),
                billingState: decryptValue(card.billingState),
                billingZip: decryptValue(card.billingZip),
            }));

            // Send user data along with payment cards in the response
            const user = {
                id: userResults[0].id,
                name: userResults[0].name,
                email: userResults[0].email,
                phone: userResults[0].phone,
                street: userResults[0].addressStreet,
                city: userResults[0].addressCity,
                state: userResults[0].addressState,
                zip: userResults[0].addressZip,
                promotions: userResults[0].promotions,
                paymentCards: decryptedCards, // Include the user's payment cards
            };

            return res.json(user);
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Error fetching user data' });
    }
});

app.put('/edit-profile', async (req, res) => {
    const userId = req.body.userId;
    const { name, email, phone, street, city, state, zip, promotions, paymentCards } = req.body;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        // Update user details
        await db.execute(
            `UPDATE registeredusers 
             SET name = ?, email = ?, phone = ?, addressStreet = ?, addressCity = ?, addressState = ?, addressZip = ? 
             WHERE id = ?`,
            [name, email, phone, street, city, state, zip, userId]
        );
        
        // Update or insert payment card details
        if (paymentCards && paymentCards.length > 0) {
            for (const card of paymentCards) {
                await db.execute(
                    `INSERT INTO paymentcard (userID, cardType, cardNumber, formatedExpirationDate, billingStreet, billingCity, billingState, billingZip)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                     ON DUPLICATE KEY UPDATE cardType = VALUES(cardType), cardNumber = VALUES(cardNumber), formatedExpirationDate = VALUES(formatedExpirationDate), billingStreet = VALUES(billingStreet), billingCity = VALUES(billingCity), billingState = VALUES(billingState), billingZip = VALUES(billingZip)`,
                    [
                        userId,
                        encryptValue(card.cardType),
                        encryptValue(card.cardNumber),
                        encryptValue(card.expirationDate),
                        encryptValue(card.billingStreet),
                        encryptValue(card.billingCity),
                        encryptValue(card.billingState),
                        encryptValue(card.billingZip)
                    ]
                );
            }
        }

        return res.json({ message: "Profile updated successfully" });
    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({ message: "Error updating profile" });
    }
});

app.get("/movie-details/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const [movies] = await db.execute("SELECT * FROM movies WHERE id = ?", [id]);

        if (movies.length === 0) {
            return res.status(404).json({ error: "Movie not found" });
        }
        
        res.json(movies[0]); // ✅ Send only the first movie
    } catch (error) {
        console.error("Error fetching movie:", error);
        res.status(500).json({ error: "Database error" });
    }
});

app.post("/change-password", async (req, res) => {
    const { userId, currentPassword, newPassword } = req.body;
    //console.log(userId);

    if (!userId || !currentPassword || !newPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const [userResult] = await db.execute("SELECT password FROM registeredusers WHERE id = ?", [userId]);
        if (userResult.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const storedHashedPassword = userResult[0].password;
        console.log(storedHashedPassword);

        const passwordMatch = await bcrypt.compare(currentPassword, storedHashedPassword);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Incorrect current password" });
        }

        const saltRounds = 10;
        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
        await db.execute("UPDATE registeredusers SET password = ? WHERE id = ?", [hashedNewPassword, userId]);
        
        res.json({ message: "Password updated successfully!" });
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});