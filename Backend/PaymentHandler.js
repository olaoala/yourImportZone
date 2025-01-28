import hairpdf from "./Pdfs/Hair.pdf"
const handlePaymentAndSendPDF = async (req, res) => {
    const { customerEmail, productId, paymentReference } = req.body;
  
    try {
      // Mock database of products with associated PDFs
      const products = [
        {
          id: 1,
          name: "Hair Vendor List",
          category: "Hair",
          price: "50",
          image1: image1,
          image2: image2,
          pdf: hairpdf,
          description:
            "The vendor list contains vendors that sell Virgin hair, frontals, bundles, closures, HD lace and etc. Some vendors also provide packaging for those that want to start a hair business. You do not need a business license. This vendor list is an electronic file (PDF). This list has up to 12 vendors to choose from.",
          relatedProducts: [
            { id: 1, name: "Wig Vendor", price: "30", image1: image1, image2: image2 },
            { id: 2, name: "Lace Vendor", price: "30", image1: image1, image2: image2 },
            { id: 3, name: "Raw Donor Vendor", price: "30", image1: image1, image2: image2 },
            { id: 4, name: "Bone Straight Vendor", price: "30", image1: image1, image2: image2 },
          ],
        },
        {
          id: 2,
          name: "Lip Gloss Vendor",
          category: "Lip Gloss",
          price: "50",
          image1: image1,
          image2: image2,
          pdf: hairpdf,
          description:
            "The vendor list contains vendors that sell lip gloss products such as lip stains, lip gels, and more. This vendor list is an electronic file (PDF) with up to 12 vendors to choose from.",
          relatedProducts: [
            { id: 1, name: "Lip Stain Vendor", price: "30", image1: image1, image2: image2 },
            { id: 2, name: "Lip Gel Vendor", price: "30", image1: image1, image2: image2 },
            { id: 3, name: "Lip Gloss Vendor", price: "30", image1: image1, image2: image2 },
            { id: 4, name: "Lip Liner Vendor", price: "30", image1: image1, image2: image2 },
          ],
        },
        {
          id: 3,
          name: "Cloth Vendor List",
          category: "Clothing",
          price: "50",
          image1: image1,
          image2: image2,
          pdf: hairpdf,
          description:
            "The vendor list contains vendors that sell various types of clothing, including male, female, and kid's clothing. This list is an electronic file (PDF) with up to 12 vendors to choose from.",
          relatedProducts: [
            { id: 1, name: "Male Cloth Vendor", price: "30", image1: image1, image2: image2 },
            { id: 2, name: "Female Cloth Vendor", price: "30", image1: image1, image2: image2 },
            { id: 3, name: "Kid's Cloth Vendor", price: "30", image1: image1, image2: image2 },
            { id: 4, name: "Lounge Wear Vendor", price: "30", image1: image1, image2: image2 },
          ],
        },
        {
          id: 4,
          name: "Lounge Wear Vendor List",
          category: "Lounge Wear",
          price: "50",
          image1: image1,
          image2: image2,
          pdf: hairpdf,
          description:
            "The vendor list contains vendors specializing in lounge wear for men and women. This is an electronic file (PDF) with up to 12 vendors to choose from.",
          relatedProducts: [
            { id: 1, name: "Casual Lounge Wear Vendor", price: "30", image1: image1, image2: image2 },
            { id: 2, name: "Silk Lounge Wear Vendor", price: "30", image1: image1, image2: image2 },
            { id: 3, name: "Cotton Lounge Wear Vendor", price: "30", image1: image1, image2: image2 },
            { id: 4, name: "Matching Sets Vendor", price: "30", image1: image1, image2: image2 },
          ],
        },
      ];
  
      const product = products.find((p) => p.id === productId);
  
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      // Verify Payment with Paystack
      const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
      const paymentVerificationResponse = await axios.get(
        `https://api.paystack.co/transaction/verify/${paymentReference}`,
        {
          headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          },
        }
      );
  
      const { data } = paymentVerificationResponse;
      if (data.status !== true || data.data.status !== "success") {
        return res.status(400).json({ error: "Payment verification failed" });
      }
  
      // Send PDF via Email
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
        subject: `Your Purchase: ${product.name}`,
        text: `Thank you for purchasing ${product.name}. Please find your PDF attached.`,
        attachments: [
          {
            filename: `${product.name}.pdf`,
            path: __dirname + product.pdf,
          },
        ],
      };
  
      await transporter.sendMail(mailOptions);
  
      return res.status(200).json({
        message: "The PDF has been sent to your email.",
      });
    } catch (error) {
      console.error("Error:", error.message || error);
      return res.status(500).json({ error: "An error occurred. Please try again." });
    }
  };
  
  module.exports = { handlePaymentAndSendPDF };
  