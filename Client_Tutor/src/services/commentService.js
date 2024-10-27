import axios from "axios";

export const createComment = async ({
  desc,
  courseId,
  lectureId,
  parent,
  replyOnUser,
}) => {
  try {
    const { data } = await axios.post("/api/comments/createComment", {
      desc,
      courseId,
      lectureId,
      parent,
      replyOnUser,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updateComment = async ({ desc, commentId }) => {
  try {
    const { data } = await axios.put(`/api/comments/editComment/${commentId}`, {
      desc,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const deleteComment = async ({ commentId }) => {
  try {
    const { data } = await axios.delete(
      `/api/comments/deleteComment/${commentId}`
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getCommentByLecture = async ({ lectureId }) => {
    try {
      const { data } = await axios.get(
        `/api/comments/getCommentByLecture/${lectureId}`
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      throw new Error(error.message);
    }
  };
  
