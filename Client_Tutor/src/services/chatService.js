import axios from "axios";

export const getTokenStream = async () => {
  try {
    const { data } = await axios.get("/api/stream/tokenStream");
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
