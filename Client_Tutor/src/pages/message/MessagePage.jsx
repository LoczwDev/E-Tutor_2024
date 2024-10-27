import React, { useEffect, useState } from "react";
import { MainLayout } from "../../components/layouts/MainLayout";
import SectionLayout from "../../components/layouts/SectionLayout";
import { useChatClient } from "../../hooks/useChatClient";
import { ChatsComponent } from "../../components/chatsMesager/ChatsComponent";
import Loading from "../../components/loader/Loading";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

const MessagePage = () => {
  const {
    client,
    userId,
    isClientReady,
    isLoading: clientLoading,
  } = useChatClient();
  
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  if (clientLoading || !isClientReady) {
    return (
      <div className="relative w-full h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <MainLayout>
      <SectionLayout>
        <div className="flex">
          <ChatsComponent client={client} userId={userId} />
        </div>
      </SectionLayout>
    </MainLayout>
  );
};
export default MessagePage;
