import React, { useState } from "react";
import axios from "axios";

const DashboardLayoutBasic = () => {
  const [conversation, setConversation] = useState(""); // To store the conversation
  const [input, setInput] = useState(""); // To handle current message input

  // Handle submission of message and API call
  const handleSend = async () => {
    if (input.trim()) {
      const updatedConversation = conversation
        ? `${conversation}\nUser: ${input}`
        : `User: ${input}`;
      setConversation(updatedConversation); // Update conversation
      setInput(""); // Clear input

      // Prepare API call with the updated conversation
      const apiKey = "AIzaSyAysrrK-OlOtw7uKoLV8_qxdQYPIjLqfZU"; // Replace with your API key
      const prompt = updatedConversation;

      const payload = {
        contents: [
          {
            parts: [
              {
                text: `Tôi muốn bạn hãy cố gắng phân tích các trường category, subcategory, maxPrice, minPrice, Name khóa học, nameTutor (tên giáo viên), khuyến mãi từ đoạn tin nhắn sau: ${prompt}, sau đó bạn hãy đưa các giá trị về dạng JSON key:value, nên nhớ là chỉ cần trả về các trường dữ liệu tương ứng thôi, không cần phải thêm giải thích nhé.`,
              },
            ],
          },
        ],
      };

      try {
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response.data.candidates[0].content.parts[0].text);
      } catch (error) {
        console.error(
          "Có lỗi xảy ra khi gọi API:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  return (
    <div className="w-full">
      <h1>Chatbot Conversation</h1>
      {/* Show conversation */}
      <textarea
        rows={10}
        className="border border-primary w-[800px]"
        value={conversation}
        readOnly
      ></textarea>
      <div>
        {/* Input for new message */}
        <textarea
          rows={3}
          className="border border-primary w-[800px] mt-2"
          placeholder="Type your message here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <div>
          {/* Single button for sending and appending message */}
          <button onClick={handleSend} className="mt-2">Send & Submit to API</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayoutBasic;
