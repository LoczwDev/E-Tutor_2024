import axios from "axios";

export const getStripepublishableKey = async () => {
  try {
    const { data } = await axios.get(
      "/api/orders/payment/stripepublishableKey"
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const createPaymentIntent = async ({ amount }) => {
  try {
    const { data } = await axios.post("/api/orders/payment", { amount });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const createOrder = async ({
  courseIds,
  payment_info,
  emailOrder,
  amount,
}) => {
  try {
    const { data } = await axios.post("/api/orders/createOrder", {
      courseIds,
      payment_info,
      emailOrder,
      amount,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const paymentMomo = async ({ amount, orderInfo }) => {
  try {
    const { data } = await axios.post("/api/momo-payment", {
      amount,
      orderInfo,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getOrderByUser = async () => {
  try {
    const { data } = await axios.get("/api/orders/getOrderByUser");
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
