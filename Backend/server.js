const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");
const products = require("../src/Products.json");
require("dotenv").config();
const axios = require("axios");


const app = express();

app.use(cors({ origin: "http://localhost:3000" })); // Adjust if needed
app.use(express.json());

// API Route to Send Email with PDF
// app.post("/api/send-pdf", async (req, res) => {
//   const { customerEmail, productIds } = req.body;

//   console.log("Request Body:", req.body);
//   if (!customerEmail) {
//     return res.status(400).json({ error: "Recipient email is required" });
//   }

//   try {
//     const selectedProducts = products.filter((product) =>
//       productIds.includes(product.id)
//     );

//     if (selectedProducts.length === 0) {
//       return res.status(404).json({ error: "No valid products found." });
//     }

//     console.log("Selected products:", selectedProducts);

//     const attachments = selectedProducts.map((product) => ({
//       filename: `${product.name}.pdf`,
//       path: path.join(__dirname, "Pdfs", `${product.name}.pdf`), // Ensure correct path
//     }));

//     // Set up Nodemailer transporter using App Password
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.APP_PASSWORD, // Use App Password instead of OAuth
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: customerEmail,
//       subject: "Your Purchased Vendor List",
//       text: "Thank you for your purchase! Please find the attached vendor list.",
//       attachments,
//     };

//     const response = await transporter.sendMail(mailOptions);
//     console.log("Email response:", response);

//     return res.status(200).json({ message: "The PDFs have been sent to your email." });

//   } catch (error) {
//     console.error("Error sending email:", error.message);
//     return res.status(500).json({ error: "An error occurred while sending the email." });
//   }
// });

app.post("/api/verify-payment", async (req, res) => {
  const { reference, customerEmail, productIds } = req.body;

  try {
    // Verify payment with Paystack
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
    });

    const paymentData = response.data;
    if (paymentData.status && paymentData.data.status === "success") {
      console.log("Payment verified:", paymentData);

      // Send email with vendor list
      const selectedProducts = products.filter((product) => productIds.includes(product.id));
      const attachments = selectedProducts.map((product) => ({
        filename: `${product.name}.pdf`,
        path: path.join(__dirname, "Pdfs", `${product.name}.pdf`),
      }));
      console.log("Email User:", process.env.EMAIL_USER);
      console.log("App Password:", process.env.APP_PASSWORD ? "Exists" : "Missing");


      // const transporter = nodemailer.createTransport({
      //   service: "gmail",
      //   auth: {
      //     user: process.env.EMAIL_USER,
      //     pass: process.env.EMAIL_APP_PASSWORD, // Use the App Password here
      //   },
      // });

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465, // Use 587 if 465 doesn’t work
        secure: true, // Use true for port 465, false for 587
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.APP_PASSWORD,
        },
      });
      
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: customerEmail,
        subject: "Your Purchased Vendor List",
        text: "Thank you for your purchase! Please find the attached vendor list.",
        attachments,
      };

      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: "Payment verified! Vendor list sent to your email." });
    } else {
      return res.status(400).json({ error: "Payment verification failed." });
    }
  } catch (error) {
    console.error("Error verifying payment:", error.message);
    return res.status(500).json({ error: "An error occurred while verifying payment." });
  }
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
