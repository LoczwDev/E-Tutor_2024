import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  addAnwser,
  addNewQuestion,
  addReview,
  allCoursePurchased,
  editCourse,
  getAllCourses,
  getcontentCoursesByUser,
  getSingleCourse,
  upploadCourse,
} from "../services/coursesService";

export const useSingleCourse = (courseId) => {
  return useQuery({
    queryFn: () => getSingleCourse({ courseId }),
    queryKey: ["singleCourse", courseId],
    onError: (error) => {
      toast.error(error.message);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useGetAllCourses = (
  keyword = "",
  page = 1,
  limit = 10,
  priceMin,
  priceMax,
  subCategory,
  durationMin,
  durationMax,
  ratings,
  level,
  sortBy
) => {
  return useQuery({
    queryFn: () =>
      getAllCourses({
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
      }),
    queryKey: [
      "allCourses",
      keyword,
      page,
      priceMin,
      priceMax,
      subCategory,
      durationMin,
      durationMax,
      ratings,
      level,
      sortBy,
    ], // Update queryKey to include relevant parameters
    onError: (error) => {
      toast.error(error.message);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const usecontentCoursesByUser = (courseId) => {
  return useQuery({
    queryFn: () => getcontentCoursesByUser({ courseId }),
    queryKey: ["contentCourseByUser", courseId],
    onError: (error) => {
      toast.error(error.message);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useGetAllCoursePurchased = (name, sortBy, page, limit) => {
  return useQuery({
    queryFn: () => allCoursePurchased({ name, sortBy, page, limit }),
    queryKey: ["allCoursePurchased"],
    onError: (error) => {
      toast.error(error.message);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useAddNewQuestion = () => {
  return useMutation({
    mutationFn: ({ question, courseId, contentId }) =>
      addNewQuestion({ question, courseId, contentId }),
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useAddAnwser = () => {
  return useMutation({
    mutationFn: ({ answer, questionId, courseId, contentId }) =>
      addAnwser({ answer, questionId, courseId, contentId }),
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useAddReview = () => {
  return useMutation({
    mutationFn: ({ review, rating, courseId }) =>
      addReview({ review, rating, courseId }),
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useCreateCourse = () => {
  return useMutation({
    mutationFn: ({ courseData }) => upploadCourse({ courseData }),
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useEditCourse = () => {
  return useMutation({
    mutationFn: ({ data, courseId }) => editCourse({ data, courseId }),
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
