import React from "react";

const ModalCustom = ({ children }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[800]">
      <div className="max-w-[1400px] bg-white p-6 shadow-tooltip">
        {children}
      </div>
    </div>
  );
};

export default ModalCustom;
