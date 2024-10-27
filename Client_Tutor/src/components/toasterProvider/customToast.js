// utils/toastUtil.js

import { toast } from "sonner";

// Function to get the current time as a string
const formatDateTime = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "2-digit",
    // hour: "numeric", 
    // minute: "numeric",
    hour12: false,
  };
  const time = new Intl.DateTimeFormat("vi-VN", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).format(date);

  // Format the full date
  const datePart = new Intl.DateTimeFormat("vi-VN", options).format(date);

  return `${time} giờ ${datePart}`;
};
const customToast = {
  success: (message, options) =>
    toast.success(message, {
      description: formatDateTime(new Date()),
      ...options,
    }),
  error: (message, options) =>
    toast.error(message, {
      description: formatDateTime(new Date()),
      ...options,
    }),
  info: (message, options) =>
    toast.info(message, {
      description: formatDateTime(new Date()),
      ...options,
    }),
  warning: (message, options) =>
    toast.warning(message, {
      description: formatDateTime(new Date()),
      ...options,
    }),
  loading: (message, options) =>
    toast.loading(message, {
      description: formatDateTime(new Date()),
      ...options,
    }),
};
// Export the custom toast functions
export default customToast;
