const Notification = require("../models/Notification");
const redisClient = require("../config/redis");

// Send notification
const sendNotification = async (studentId, message) => {
  try {
    const notification = new Notification({ studentId, message });
    await notification.save();

    // Store in Redis
    await redisClient.lPush(`notifications:${studentId}`, JSON.stringify(notification));
  } catch (error) {
    console.error("Notification Error:", error);
  }
};

// Get student notifications
const getNotifications = async (req, res) => {
  try {
    const studentId = req.params.id;
    let notifications = await redisClient.lRange(`notifications:${studentId}`, 0, -1);

    if (!notifications.length) {
      notifications = await Notification.find({ studentId });
    } else {
      notifications = notifications.map(JSON.parse);
    }

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { sendNotification, getNotifications };
