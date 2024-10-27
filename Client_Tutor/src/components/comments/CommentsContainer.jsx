import React, { useState, useEffect } from "react";

import CommentsForm from "./CommentsForm";
import Comment from "./Comment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useUser from "../../hooks/useUser";
import {
  createComment,
  deleteComment,
  updateComment,
} from "../../services/commentService";
import { toast } from "sonner";
import stable from "../../constants/stables/stables";
import { io } from "socket.io-client";

const ENDPOINT = stable.NODE_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = io(ENDPOINT, { transports: ["websocket", "polling"] });

const CommentsContainer = ({
  className,
  logginedUserId,
  comments,
  courseId,
  lectureId,
  refetch,
}) => {
  const queryClient = useQueryClient();
  const user = useUser();
  const [affectComment, setAffectComment] = useState(null);

  const { mutate: mutateNewComment, isLoading: isLoadingNewComment } =
    useMutation({
      mutationFn: ({ desc, courseId, lectureId, parent, replyOnUser }) => {
        return createComment({
          desc,
          courseId,
          lectureId,
          parent,
          replyOnUser,
        });
      },
      onSuccess: () => {
        refetch();
        socketId.emit("notification", {
          title: "Bình luận mới",
          message: `Bạn có một bình luận mới`,
          userId: user?._id,
        });
        toast.success("Comment thành công");
      },
      onError: (error) => {
        toast.error(error);
        console.log(error);
      },
    });

  const { mutate: mutateUpdateComment, isLoading: isLoadingUpdateComment } =
    useMutation({
      mutationFn: ({ desc, commentId }) => {
        return updateComment({ desc, commentId });
      },
      onSuccess: () => {
        toast.success("Update comment thành công");
        queryClient.invalidateQueries(["comment", lectureId]);
      },

      onError: (error) => {
        toast.error(error);
        console.log(error);
      },
    });

  const { mutate: mutateDeleteComment, isLoading: isLoadingDeleteComment } =
    useMutation({
      mutationFn: ({ commentId }) => {
        return deleteComment({ commentId });
      },
      onSuccess: () => {
        toast.success("Xóa comment thành công");
        queryClient.invalidateQueries(["comment", lectureId]);
      },

      onError: (error) => {
        toast.error(error);
        console.log(error);
      },
    });
  // console.log(comments, "comments");

  const addCommentHanlder = (value, parent = null, replyOnUser = null) => {
    mutateNewComment({
      desc: value,
      parent,
      replyOnUser,
      courseId,
      lectureId,
    });
    setAffectComment(null);
    refetch();
  };

  const updateCommentHanlder = (value, commentId) => {
    mutateUpdateComment({
      desc: value,
      commentId,
    });
    setAffectComment(null);
  };

  const deleteCommentHanlder = (commentId) => {
    mutateDeleteComment({ commentId });
  };

  return (
    <div className={`${className} `}>
      {user ? (
        <CommentsForm
          btnLabel="Gửi"
          loading={isLoadingNewComment}
          formSubmitHanlder={(value) => addCommentHanlder(value)}
        />
      ) : (
        ""
      )}

      <div className="space-y-4 mt-8">
        {comments?.map((comment, index) => (
          <Comment
            key={index}
            comment={comment}
            logginedUserId={logginedUserId}
            affectComment={affectComment}
            setAffectComment={setAffectComment}
            addComment={addCommentHanlder}
            updateComment={updateCommentHanlder}
            deleteComment={deleteCommentHanlder}
            getReply={comment.replies}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsContainer;
