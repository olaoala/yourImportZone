const axios = require("axios");
const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
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
          pass: process.env.EMAIL_APP_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: customerEmail,
        subject: "Your Purchased Vendor List",
        text: "Thank you for your purchase! Please find the attached vendor list.",
        attachments: productIds.map((id) => ({
          filename: `${id}.pdf`,
          path: `./src/Pdfs/${id}.pdf`, // Adjust path if needed
        })),
      };

      await transporter.sendMail(mailOptions);

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Payment verified! Email sent." }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Payment verification failed." }),
      };
    }
  } catch (error) {
    console.error("Error:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "An error occurred while processing payment." }),
    };
  }
};
