// CustomMessage.js
import React from "react";
import { MessageSimple } from "stream-chat-react";

const CustomMessage = (props) => {
  const { message, isMyMessage } = props;

  const messageStyle = {
    backgroundColor: isMyMessage ? "#FF6636" : "#FFEEE8", // Change colors as needed
  };

  return (
    <div style={messageStyle}>
      <MessageSimple {...props} />
    </div>
  );
};

export default CustomMessage;
