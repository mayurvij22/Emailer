import bodyParser from "body-parser";
import express from "express";
import nodemailer from "nodemailer";

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gmail@gmail.com", // Your email
    pass: "password of yours ", // Your email password (or app-specific password)
  },
});

// Login route (GET or POST)
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Here, add your logic to check the email and password (e.g., validate from DB)
  if (email && password) {
    // Send the password to the provided email
    const mailOptions = {
      from: "mayurvij22@gmail.com",
      to: email,
      subject: "Your Login Details",
      text: `Your password is: ${password}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send("Error sending email: " + error.message);
      }
      res.send("Password has been sent to your email");
    });
  } else {
    res.status(400).send("Invalid input");
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
