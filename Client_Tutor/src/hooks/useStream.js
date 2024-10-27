import { useQuery } from "@tanstack/react-query";
import { getTokenStream } from "../services/chatService";
import { toast } from "sonner";

export const useGetTokenStream = () => {
  return useQuery({
    queryFn: () => getTokenStream(),
    queryKey: ["tokenStream"],
    onError: (error) => {
      toast.error(error.message);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
