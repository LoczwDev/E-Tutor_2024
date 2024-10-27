import { useState } from "react";
import { useMemo } from "react";
import { useTranslationContext } from "stream-chat-react";
import images from "../../constants/images/images";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal"; // Import your modal
import { toast } from "sonner";

export const CustomChannelPreview = (props) => {
  const {
    channel,
    activeChannel,
    displayImage,
    displayTitle,
    latestMessagePreview,
    setActiveChannel,
  } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const members = Object.values(channel.state.members);
  const { userLanguage } = useTranslationContext();
  const check = members.some((member) => member.user.online);
  console.log(check);

  const memberNames = useMemo(() => {
    if (members.length === 2) {
      const otherMember = members.find(
        (member) => member.user_id !== channel.state?.currentUser?.id
      );
      return otherMember?.user?.name || "Anonymous";
    }
    return members.map((member) => member.user?.name || "Anonymous").join(", ");
  }, [members, channel]);

  const latestMessageAt = channel.state.last_message_at;
  const isSelected = channel.id === activeChannel?.id;

  const timestamp = useMemo(() => {
    if (!latestMessageAt) {
      return "";
    }
    const formatter = new Intl.DateTimeFormat(userLanguage, {
      timeStyle: "short",
    });
    return formatter.format(latestMessageAt);
  }, [latestMessageAt, userLanguage]);

  const handleDelete = async () => {
    try {
      await channel.delete();
      toast.success("Cuộc trò chuyện đã được xóa.");
      setActiveChannel(null);
    } catch (error) {
      toast.error("Không thể xóa cuộc trò chuyện.");
      console.error("Error deleting channel:", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleClick = () => {
    setActiveChannel?.(channel);
  };

  return (
    <div className={`w-full`}>
      <button
        className={`w-full flex items-start justify-between p-3 ${isSelected ? "bg-[#FFDDD1]" : "bg-white"}`}
        disabled={isSelected}
        onClick={handleClick}
      >
        <div className="flex items-center gap-2">
          <div className="w-16 h-16 rounded-full">
            <div className="relative w-full h-full rounded-full z-10">
              <img
                className="w-full h-full rounded-full object-cover"
                src={displayImage ? displayImage : images.AvatarCur}
                alt={`avatar_${memberNames}`}
              />
              <div
                className={`absolute w-5 h-5 rounded-full p-1 ${isSelected ? "bg-[#FFDDD1]" : "bg-white"} top-[45px] right-0 z-[100] `}
              >
                <div
                  className={`w-full h-full rounded-full ${
                    members.some((member) => member.user.online)
                      ? "bg-success"
                      : "bg-transparent"
                  }`}
                ></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2">
            <div className="text-gray9 font-medium">
              {displayTitle || memberNames}
            </div>
            <div className="text-gray7 text-sm">{latestMessagePreview}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <time
            dateTime={latestMessageAt?.toISOString()}
            className="text-sm text-gray7"
          >
            {timestamp}
          </time>
          <div className="text-error">
            <button
              className="channel-preview__delete"
              onClick={() => setIsModalOpen(true)}
            >
              Xóa
            </button>
          </div>
        </div>
      </button>

      {/* Move the delete button outside the main button */}

      {/* Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};
