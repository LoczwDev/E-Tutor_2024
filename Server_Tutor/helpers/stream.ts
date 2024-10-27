// stream.js
import { StreamChat } from "stream-chat";

const streamClient = (() => {
  const apiKey: string | undefined = process.env.PUBLIC_STREAM_API_KEY;
  const secret: string | undefined = process.env.STREAM_SECRET_KEY;

  if (!apiKey || !secret) {
    throw new Error("Stream API credentials are missing");
  }

  return StreamChat.getInstance(apiKey, secret);
})();

export const getStreamToken = (user: any) => {
  if (!user || !user._id) {
    throw new Error("Invalid user object");
  }
  return streamClient.createToken(user._id.toString());
};

export const syncUser = async ({ _id }: { _id: string }) => {
  if (!_id) {
    throw new Error("User ID is required for synchronization");
  }
  await streamClient.upsertUser({
    id: _id.toString(),
  });
};

export const syncUsers = (users: any) => {
  users.forEach(syncUser);
};
