import {
  Chat,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  ChannelList,
  useChannelStateContext,
  TypingIndicator,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import "./chats.css";
import { Streami18n } from "stream-chat-react";

const vietnameseTranslations = {
  "Type your message": "Nhập tin nhắn",
  members: "Thành viên",
  "Nothing yet...": "Chưa có gì...",
  Send: "Gửi",
  Search: "Tìm kiếm",
  "Edit Message": "Chỉnh sửa tin nhắn",
  Delete: "Xóa",
  Reply: "Trả lời",
  "Send a message": "Nhập tin nhắn...",
  "This message has been deleted.": "Tin nhắn này đã bị xóa.",
  "No chats here yet…": "Chưa có cuộc trò chuyện nào ở đây…",
  "You have no channels currently": "Hiện tại bạn không có cuộc trò truyện nào",
  "Searching...": "Đang kiếm...",
  "No results found": "Không tìm thấy kết quả nào",
  Thread: "Chủ đề",
  replyCount: "Có trả lời",
  searchResultsCount: "Kết quả",
};

export const ChatsComponent = ({ client, userId }) => {
  const streami18n = new Streami18n({
    language: "vi",
    translationsForLanguage: {
      ...vietnameseTranslations,
    },
  });
  const filters = { members: { $in: [userId] }, type: "messaging" };
  const sort = { last_message_at: -1 };
  const options = { state: true, watch: true, presence: true };

  return (
    <Chat client={client} i18nInstance={streami18n}>
      <div className="w-full flex gap-5">
        <div className="w-1/3 border border-gray1 h-[80vh] overflow-hidden">
          <div className="w-full p-3 mb-2">
            <h3 className="text-base font-bold">Tin Nhắn</h3>
          </div>
          <ChannelList
            // Preview={CustomChannelPreview}
            sort={sort}
            filters={filters}
            options={options}
            showChannelSearch
          />
        </div>
        <div className="flex-1 border border-gray1">
          <Channel TypingIndicator={() => null}>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
        </div>
      </div>
    </Chat>
  );
};
