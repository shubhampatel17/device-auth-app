const redisClient = require("../config/redis");
const { v4: uuidv4 } = require("uuid");

exports.authenticateBiometric = async (req, res) => {
  try {
    const { deviceId, email } = req.body;

    if (!deviceId || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const token = uuidv4(); // Generate a temporary token
    await redisClient.setEx(`auth_token:${token}`, 300, deviceId); // Expires in 5 mins

    return res.json({ success: true, token });
  } catch (error) {
    console.error("❌ Authentication Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
