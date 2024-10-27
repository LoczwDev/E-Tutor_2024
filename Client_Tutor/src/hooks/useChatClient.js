import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import useUser from "./useUser";
import { useGetTokenStream } from "./useStream";

export const useChatClient = () => {
  const user = useUser();
  const { data, isLoading } = useGetTokenStream();

  const apiKey = "769rbex4awnk"; // Your actual API key here
  const userId = user?._id;
  const avatar = user?.avatar?.url;
  const token = data?.token;
  const name = user?.lastName;

  const [client, setClient] = useState(null);
  const [isClientReady, setIsClientReady] = useState(false);

  useEffect(() => {
    if (!userId || !token) return;

    const chatClient = StreamChat.getInstance(apiKey);
    let isUnmounted = false;
    chatClient
      .connectUser({ id: userId, image: avatar, name: name }, token)
      .then(() => {
        if (!isUnmounted) {
          setClient(chatClient);
          setIsClientReady(true);
        }
      })
      .catch((err) => {
        console.error("Có lỗi khi kết nối tin nhắn:", err);
      });

    return () => {
      isUnmounted = true;
      if (chatClient) {
        chatClient.disconnectUser();
      }
    };
  }, [userId, name, avatar, token]);

  return { client, userId, name, avatar, isClientReady, isLoading };
};
