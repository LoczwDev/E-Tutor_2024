import React from "react";
import { ChatsComponent } from "../../components/chatsMesager/ChatsComponent";
import { useChatClient } from "../../hooks/useChatClient";

const ContentMessage = () => {
  const {
    client,
    userId,
    isClientReady,
    isLoading: clientLoading,
  } = useChatClient();

  if (clientLoading || !isClientReady) {
    return <div>Loading chat client...</div>;
  }

  return (
    <div className="flex">
      <ChatsComponent client={client} userId={userId} />
    </div>
  );
};

export default ContentMessage;
