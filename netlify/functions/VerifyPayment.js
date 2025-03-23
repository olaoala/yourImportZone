const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");
const products = require("../../src/Products.json"); // Load product data

exports.handler = async (event) => {
  try {
    const { productId, email } = JSON.parse(event.body);
    
    console.log("Received Product ID:", productId);
    console.log("Email:", email);

    // Find product by ID
    const product = products.find((p) => p.id === productId);
    
    if (!product) {
      console.error(`Product not found for ID: ${productId}`);
      return { statusCode: 404, body: JSON.stringify({ error: "Product not found" }) };
    }

    console.log("Selected Product:", product.name);
    console.log("PDF File Name:", product.pdfUrl);

    // Construct the correct path to the PDF
    const pdfFilePath = path.join(__dirname, "Pdfs", product.pdfUrl);
    
    if (!fs.existsSync(pdfFilePath)) {
      console.error("PDF not found at:", pdfFilePath);
      return { statusCode: 500, body: JSON.stringify({ error: "PDF file missing" }) };
    }

    // Configure email transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Purchased Vendor List",
      text: `Hi there! Thank you for your purchase. Attached is your vendor list: ${product.name}.`,
      attachments: [
        {
          filename: product.pdfUrl,
          path: pdfFilePath,
        },
      ],
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log("📧 Email sent successfully with PDF:", product.pdfUrl);

    return { statusCode: 200, body: JSON.stringify({ message: "Email sent successfully" }) };
  } catch (error) {
    console.error("Error in verifyPayment function:", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Internal Server Error" }) };
  }
};
