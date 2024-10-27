import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createPaymentIntent,
  getOrderByUser,
  getStripepublishableKey,
  paymentMomo,
} from "../services/orderService";

export const useGetStripePublishableKey = () => {
  return useQuery({
    queryFn: () => getStripepublishableKey(),
    queryKey: ["getStripepublishableKey"],
    onError: (error) => {
      toast.error(error.message);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useCreatePaymentIntent = () => {
  return useMutation({
    mutationFn: ({ amount }) => createPaymentIntent({ amount }),
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const usePaymentMomo = () => {
  return useMutation({
    mutationFn: ({ amount, orderInfo }) => paymentMomo({ amount, orderInfo }),
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetOrderByUser = () => {
  return useQuery({
    queryFn: () => getOrderByUser(),
    queryKey: ["getOrderByUser"],
    onError: (error) => {
      toast.error(error.message);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
