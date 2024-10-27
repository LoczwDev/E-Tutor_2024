import axios from "axios";

export const getAllNotification = async () => {
  try {
    const { data } = await axios.get("/api/notifications/getAllNotification");
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getNotificationByUser = async ({ userId }) => {
  try {
    const { data } = await axios.get(
      `/api/notifications/getNofificationByUser/${userId}`
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updateNotificationByUser = async ({ notificationId }) => {
  try {
    const { data } = await axios.put(
      `/api/notifications/updateNotification/${notificationId}`
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
