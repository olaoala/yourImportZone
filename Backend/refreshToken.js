const { google } = require("googleapis");
require("dotenv").config();

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "http://localhost:5000/auth/google/callback"
);

const getNewRefreshToken = async (authCode) => {
  try {
    const { tokens } = await oauth2Client.getToken(authCode);
    console.log("New Refresh Token:", tokens.refresh_token);
  } catch (error) {
    console.error("Error getting new refresh token:", error.message);
  }
};

getNewRefreshToken("YOUR_AUTHORIZATION_CODE_HERE");
