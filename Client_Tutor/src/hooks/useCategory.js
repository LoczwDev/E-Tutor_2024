import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createCategory,
  deleteCategory,
  editCategroy,
  getAllCategory,
} from "../services/categoryService";
import { toast } from "sonner";

export const useGetAllCategory = () => {
  return useQuery({
    queryFn: () => getAllCategory(),
    queryKey: ["allCategory"],
    onError: (error) => {
      toast.error(error.message);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: ({ dataCategory }) => createCategory({ dataCategory }),
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useEditCategory = () => {
  return useMutation({
    mutationFn: ({ dataCategory, categoryId }) =>
      editCategroy({ dataCategory, categoryId }),
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: ({ categoryId }) => deleteCategory({ categoryId }),
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
