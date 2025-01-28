const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // Adjust origin as needed
app.use(express.json());

// Mock Products Array
const products = [
  {
    id: 1,
    name: "Hair Vendor List",
    category: "Hair",
    price: "50",
    pdf: "./Pdfs/Hair.pdf",
    description: "The vendor list contains vendors that sell Virgin hair...",
  },
  {
    id: 2,
    name: "Lip Gloss Vendor",
    category: "Lip Gloss",
    price: "50",
    pdf: "./Pdfs/Hair.pdf",
    description: "The vendor list contains vendors that sell lip gloss products...",
  },
  {
    id: 3,
    name: "Cloth Vendor List",
    category: "Clothing",
    price: "50",
    pdf: "./Pdfs/Hair.pdf",
    description: "The vendor list contains vendors that sell various types of clothing...",
  },
  {
    id: 4,
    name: "Lounge Wear Vendor List",
    category: "Lounge Wear",
    price: "50",
    pdf: "./Pdfs/Hair.pdf",
    description: "The vendor list contains vendors specializing in lounge wear...",
  },
];

// Root Endpoint for Health Check
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Send PDF API Endpoint
app.post("/api/send-pdf", async (req, res) => {
    const { customerEmail, productIds } = req.body;
  
    try {
      const selectedProducts = products.filter((product) =>
        productIds.includes(product.id)
      );
  
      if (selectedProducts.length === 0) {
        return res.status(404).json({ error: "No valid products found." });
      }
  
      console.log("Selected products:", selectedProducts);
  
      const attachments = selectedProducts.map((product) => {
        if (!product.pdf) {
          console.error(`Product PDF not found for product: ${product.name}`);
          throw new Error("Product PDF not found");
        }
  
        return {
          filename: `${product.name}.pdf`,
          path: product.pdf, // Ensure this points to the correct file path
        };
      });
  
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: customerEmail,
        subject: `Your Purchase: ${selectedProducts.map((p) => p.name).join(", ")}`,
        text: `Thank you for purchasing the following items: ${selectedProducts
          .map((p) => p.name)
          .join(", ")}. Please find your PDFs attached.`,
        attachments,
      };
  
      await transporter.sendMail(mailOptions);
  
      return res.status(200).json({ message: "The PDFs have been sent to your email." });
    } catch (error) {
      console.error("Error sending email:", error.message);
      return res.status(500).json({ error: "An error occurred while sending the email." });
    }
  });
  

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
