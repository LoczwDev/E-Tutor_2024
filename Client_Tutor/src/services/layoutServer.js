import axios from "axios";

export const getLayout = async ({ type }) => {
  try {
    const { data } = await axios.get(`/api/layouts/getLayoutByType/${type}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const createLayout = async ({ type, imageBanner, title, subTitle }) => {
  try {
    const { data } = await axios.post("/api/layouts/createLayout", {
      type,
      imageBanner,
      title,
      subTitle,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const editLayout = async ({ type, imageBanner, title, subTitle }) => {
  try {
    const { data } = await axios.put(`/api/layouts/editLayout`, {
      type,
      imageBanner,
      title,
      subTitle,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
