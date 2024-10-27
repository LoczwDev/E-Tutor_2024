import React from "react";

const Loading = () => {
  return (
    <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
      <div className="p-2 bg-gradient-to-tr animate-spin from-primary to-secondary via-warning rounded-full">
        <div className="bg-white rounded-full">
          <div className="w-12 h-12 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
