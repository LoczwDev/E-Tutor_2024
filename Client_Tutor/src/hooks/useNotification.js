import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getAllNotification,
  getNotificationByUser,
  updateNotificationByUser,
} from "../services/notificationService";

export const useGetAllNotification = () => {
  return useQuery({
    queryFn: () => getAllNotification(),
    queryKey: ["notification"],
    onError: (error) => {
      toast.error(error.message);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useGetNotificationByUser = (userId) => {
  return useQuery({
    queryFn: () => getNotificationByUser({ userId }),
    queryKey: ["notificationByUser"],
    onError: (error) => {
      toast.error(error.message);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useUpdateNotificationByUser = () => {
  return useMutation({
    mutationFn: ({ notificationId }) =>
      updateNotificationByUser({ notificationId }),
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
