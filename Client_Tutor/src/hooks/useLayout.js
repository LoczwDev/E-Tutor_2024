import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { createLayout, editLayout, getLayout } from "../services/layoutServer";

export const useCreateLayout = () => {
  return useMutation({
    mutationFn: ({ type, imageBanner, title, subTitle }) =>
      createLayout({ type, imageBanner, title, subTitle }),
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useEditLayout = () => {
  return useMutation({
    mutationFn: ({ type, imageBanner, title, subTitle }) =>
      editLayout({ type, imageBanner, title, subTitle }),
    onError: (error) => {
      toast.error(error.message);
    },
  });
};


export const useGetLayout = (type) => {
  return useQuery({
    queryFn: () => getLayout({ type }),
    queryKey: ["layoutType", type],
    onError: (error) => {
      toast.error(error.message);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};