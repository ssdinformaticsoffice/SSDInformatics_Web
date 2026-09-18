import Notification from "../models/Notification.js";

// Get Notifications
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Mark All Notifications as Read
export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { isRead: false },
      { $set: { isRead: true } }
    );

    res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};