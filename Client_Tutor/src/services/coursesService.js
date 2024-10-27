import axios from "axios";

export const upploadCourse = async ({ courseData }) => {
  try {
    const { data } = await axios.post("/api/courses/upload", {
      courseData,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const editCourse = async ({ courseId, data }) => {
  try {
    const { dataCourse } = await axios.put(
      `/api/courses/edit-course/${courseId}`,
      {
        data,
      }
    );
    return dataCourse;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getSingleCourse = async ({ courseId }) => {
  try {
    const { data } = await axios.get(`/api/courses/singleCourse/${courseId}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getcontentCoursesByUser = async ({ courseId }) => {
  try {
    const { data } = await axios.get(
      `/api/courses/contentCoursesByUser/${courseId}`
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const setCompleteLecture = async ({ courseId, completedLectureId }) => {
  try {
    const { data } = await axios.put(`/api/courses/completeLecture`, {
      courseId,
      completedLectureId,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

// add question

export const addNewQuestion = async ({ question, courseId, contentId }) => {
  try {
    const { data } = await axios.put(`/api/courses/createQuesion`, {
      question,
      courseId,
      contentId,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const addAnwser = async ({
  answer,
  questionId,
  courseId,
  contentId,
}) => {
  try {
    const { data } = await axios.put(`/api/courses/addAnwser`, {
      answer,
      questionId,
      courseId,
      contentId,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

// ratting

export const addReview = async ({ review, rating, courseId }) => {
  try {
    const { data } = await axios.put(`/api/courses/addReview/${courseId}`, {
      review,
      rating,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getAllCourses = async ({
  keyword = "",
  page = 1,
  limit = 10,
  priceMin = 0,
  priceMax = 20000000,
  subCategory = "",
  durationMin = 0,
  durationMax = 365,
  ratings = 0,
  level = "",
  sortBy = "",
}) => {
  try {
    const params = new URLSearchParams({
      keyword,
      page,
      limit,
      priceMin,
      priceMax,
      subCategory,
      durationMin,
      durationMax,
      ratings,
      level,
      sortBy,
    }).toString();

    const { data } = await axios.get(`/api/courses?${params}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const allCoursePurchased = async ({
  name = "",
  sortBy = "",
  page = 1,
  limit = 10,
}) => {
  try {
    const params = new URLSearchParams({
      name,
      sortBy,
      page,
      limit,
    }).toString();
    const { data } = await axios.get(
      `/api/courses/allCoursePurchased?${params}`
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
