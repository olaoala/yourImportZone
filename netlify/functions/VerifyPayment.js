const axios = require("axios");
const nodemailer = require("nodemailer");
const products = require("../../src/Products.json"); 

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { 
      statusCode: 405, 
      headers: { "Access-Control-Allow-Origin": "*" }, 
      body: "Method Not Allowed" 
    };
  }

  // ✅ Handle CORS preflight request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "CORS preflight successful",
    };
  }

  const { reference, customerEmail, productIds } = JSON.parse(event.body);

  try {
    // ✅ Verify payment with Paystack
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
      // ✅ Set up Nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.APP_PASSWORD,
        },
      });

      console.log("Email User:", process.env.EMAIL_USER);
      console.log("Email Password:", process.env.APP_PASSWORD ? "Loaded" : "Missing");
      
      // ✅ Dynamically Get PDF URLs
      const attachments = productIds.map((id) => {
        const product = products.find((p) => p.id === id);
        if (!product) {
          console.error("🚨 Product not found for ID:", id);
          return null; // Skip invalid products
        }

        if (!product.pdfUrl) {
          console.error("🚨 No PDF URL found for product:", product.name);
          return null;
        }

        console.log(`📌 Attaching PDF: ${product.pdfUrl} for ${product.name}`);

        return {
          filename: product.pdfUrl.split("/").pop(), // Get filename from URL
          path: product.pdfUrl, // ✅ Use Netlify-hosted PDF link
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
      console.log("📧 Email sent successfully with attachments! 🚀");

      return {
        statusCode: 200,
        headers: { "Access-Control-Allow-Origin": "*" }, 
        body: JSON.stringify({ message: "Payment verified! Email sent with PDF." }),
      };
    } else {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" }, 
        body: JSON.stringify({ error: "Payment verification failed." }),
      };
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" }, 
      body: JSON.stringify({ error: "An error occurred while processing payment." }),
    };
  }
};
