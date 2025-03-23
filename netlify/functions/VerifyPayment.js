const axios = require("axios");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
const products = require("../../src/Products.json");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { 
      statusCode: 405, 
      headers: { "Access-Control-Allow-Origin": "*" }, 
      body: "Method Not Allowed" 
    };
  }

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
      
      // ✅ Ensure `productIds` is an array
      const productIdArray = Array.isArray(productIds) ? productIds : [productIds];

      // ✅ Construct attachments correctly
      const attachments = productIdArray.map((id) => {
        const product = products.find((p) => p.id === id);
        if (!product) {
          console.error("❌ Product not found for ID:", id);
          return null;
        }

        // ✅ Update the PDF path to the new location
        const pdfPath = path.join(__dirname, "Pdfs", `${id}.pdf`);
        if (!fs.existsSync(pdfPath)) {
          console.error("🚨 PDF not found at:", pdfPath);
          return null;
        }

        console.log(`✅ Attaching PDF for product: ${product.name}, Path: ${pdfPath}`);

        return {
          filename: path.basename(pdfPath),
          path: pdfPath,
        };
      }).filter(Boolean);

      if (attachments.length === 0) {
        return {
          statusCode: 400,
          headers: { "Access-Control-Allow-Origin": "*" }, 
          body: JSON.stringify({ error: "No valid PDFs found to send." }),
        };
      }

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: customerEmail,
        subject: "Your Purchased Vendor List",
        text: "Thank you for your purchase! Please find the attached vendor list.",
        attachments, 
      };

      await transporter.sendMail(mailOptions);
      console.log("📧 Email sent successfully with attachments!");

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
    console.error("Error:", error.message);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" }, 
      body: JSON.stringify({ error: "An error occurred while processing payment." }),
    };
  }
};
