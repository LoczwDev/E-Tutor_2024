import axios from "axios";

export const registerUser = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  try {
    const { data } = await axios.post("/api/users/register", {
      firstName,
      lastName,
      email,
      password,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const activitionUser = async ({ activation_token, activation_code }) => {
  try {
    const { data } = await axios.post("/api/users/activate-User", {
      activation_token,
      activation_code,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const { data } = await axios.post("/api/users/login", {
      email,
      password,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getProfileUser = async () => {
  try {
    const { data } = await axios.get("/api/users/profileUser");
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updateAccessToken = async () => {
  try {
    const { data } = await axios.get("/api/users/refresh");
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const logoutUser = async () => {
  try {
    const { data } = await axios.get("/api/users/logout");
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updateProfile = async ({
  firstName,
  lastName,
  username,
  email,
  phone,
  title,
  introduction,
  avatar,
}) => {
  try {
    const { data } = await axios.put("/api/users/updateUserInfo", {
      firstName,
      lastName,
      username,
      email,
      phone,
      title,
      introduction,
      avatar,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updatePasswordUser = async ({ oldPassword, newPassword }) => {
  try {
    const { data } = await axios.put("/api/users/updatePasswordUser", {
      oldPassword,
      newPassword,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getAllUser = async () => {
  try {
    const { data } = await axios.get("/api/users/getAllUsersAdmin");
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const createCourseNote = async ({
  courseId,
  lectureId,
  titleLecture,
  timeNoteLecture,
  textNote,
}) => {
  try {
    const { data } = await axios.post("/api/users/createNote", {
      courseId,
      lectureId,
      titleLecture,
      timeNoteLecture,
      textNote,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updateCourseNode = async ({
  courseId,
  lectureId,
  noteId,
  textNote,
}) => {
  try {
    const { data } = await axios.put("/api/users/updateNode", {
      courseId,
      lectureId,
      noteId,
      textNote,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const deleteCourseNote = async ({ courseId, lectureId, noteId }) => {
  try {
    console.log(courseId, lectureId, noteId);

    const { data } = await axios.delete("/api/users/deleteNote", {
      data: {
        courseId,
        lectureId,
        noteId,
      },
    });

    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const toggleFavorite = async ({ courseId }) => {
  try {
    console.log(courseId);

    const { data } = await axios.post("/api/users/toggleFavorite", {
      courseId,
    });

    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getTeacherInfo = async ({ teacherId }) => {
  try {

    const { data } = await axios.get(`/api/users/teacher/${teacherId}`);

    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
