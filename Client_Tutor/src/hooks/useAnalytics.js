import { toast } from "sonner";
import {
  getOrdersAnalytics,
  getOverviewAnalytics,
} from "../services/analyticsService";
import { useQuery } from "@tanstack/react-query";

export const usegetOverviewAnalytics = () => {
  return useQuery({
    queryFn: () => getOverviewAnalytics(),
    queryKey: ["overviewAnalytics"],
    onError: (error) => {
      toast.error(error.message);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useGetOrdersAnalytics = () => {
  return useQuery({
    queryFn: () => getOrdersAnalytics(),
    queryKey: ["ordersAnalytics"],
    onError: (error) => {
      toast.error(error.message);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
