// components/ui/MyToaster.jsx

import { Toaster } from "sonner";
import React from "react";
import {
  AlertTriangle,
  CheckCircle,
  Info,
  Loader,
  XCircle,
} from "lucide-react";

const MyToaster = () => {
  const getCurrentTime = () => new Date().toLocaleTimeString();
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        classNames: {
          toast: "p-4 rounded shadow-drop",
          icon: "!h-6 !w-6",
          title: "font-bold text-base",
          description: "text-base font-semibold text-gray7",
          closeButton: "ml-auto text-gray-400 hover:text-gray-600",
          error: "text-error",
          success: "text-success",
          warning: "text-warning",
          info: "text-secondary",
        },
        duration: 1500,
        description: getCurrentTime(),
      }}
      
    />
  );
};

export default MyToaster;
