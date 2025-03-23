const axios = require("axios");
const nodemailer = require("nodemailer");
const path = require("path");
const products = require("../../src/Products.json"); // ✅ Adjust path if necessary



exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { 
      statusCode: 405, 
      headers: { "Access-Control-Allow-Origin": "*" }, // ✅ Allow all origins
      body: "Method Not Allowed" 
    };
  }

  // ✅ Handle CORS preflight request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // ✅ Allow all origins
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "CORS preflight successful",
    };
  }

  const { reference, customerEmail, productIds } = JSON.parse(event.body);

  try {
    // Verify payment with Paystack
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const paymentData = response.data;
    if (paymentData.status && paymentData.data.status === "success") {
      // Set up Nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.APP_PASSWORD,
        },
      });
      console.log("Email User:", process.env.EMAIL_USER);
      console.log("Email Password:", process.env.APP_PASSWORD ? "Loaded" : "Missing");
      
      const filePaths = productIds.map((id) => path.join(__dirname, "..", "Pdfs", `${id}.pdf`));
console.log("Generated PDF Paths:", filePaths);

const siteUrl = "https://yourimportzone.netlify.app/"; // Replace with your actual Netlify URL

const attachments = productIds.map((id) => {
  const product = products.find((p) => p.id === id);
  if (!product) {
    console.error("Product not found for ID:", id);
    return null; // Skip invalid products
  }

  const pdfUrl = `${siteUrl}${product.pdfUrl}`; // ✅ Create the full PDF URL
  console.log(`Attaching PDF for product: ${product.name}, URL: ${pdfUrl}`);

  return {
    filename: product.pdfUrl.split("/").pop(), // Extracts filename
    path: pdfUrl, // ✅ Attach as URL
  };
}).filter(Boolean); // Remove null values

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: customerEmail,
  subject: "Your Purchased Vendor List",
  text: "Thank you for your purchase! Please find the attached vendor list.",
  attachments, // ✅ Attachments added here
};



      await transporter.sendMail(mailOptions);

      return {
        statusCode: 200,
        headers: { "Access-Control-Allow-Origin": "*" }, // ✅ Allow all origins
        body: JSON.stringify({ message: "Payment verified! Email sent." }),
      };
    } else {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" }, // ✅ Allow all origins
        body: JSON.stringify({ error: "Payment verification failed." }),
      };
    }
  } catch (error) {
    console.error("Error:", error.message);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" }, // ✅ Allow all origins
      body: JSON.stringify({ error: "An error occurred while processing payment." }),
    };
  }
};
