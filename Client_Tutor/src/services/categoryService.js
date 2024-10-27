import axios from "axios";

export const getAllCategory = async () => {
  try {
    const { data } = await axios.get("/api/categories/");
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const createCategory = async ({ dataCategory }) => {
  try {
    const { data } = await axios.post("/api/categories/createCategory", {
      dataCategory,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const editCategroy = async ({ dataCategory, categoryId }) => {
  try {
    const { data } = await axios.put(
      `/api/categories/editCategory/${categoryId}`,
      {
        dataCategory,
      }
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const deleteCategory = async ({ categoryId }) => {
  try {
    const { data } = await axios.delete(
      `/api/categories/deleteCategory/${categoryId}`
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
