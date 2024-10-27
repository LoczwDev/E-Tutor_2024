import axios from "axios";

export const getOverviewAnalytics = async () => {
  try {
    const { data } = await axios.get("/api/analytics/getOverviewAnalytics");
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getOrdersAnalytics = async () => {
  try {
    const { data } = await axios.get("/api/analytics/getOrdersAnalytics");
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
