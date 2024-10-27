import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [selectedChannel, setSelectedChannel] = useState(null);

  return (
    <ChatContext.Provider value={{ selectedChannel, setSelectedChannel }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
