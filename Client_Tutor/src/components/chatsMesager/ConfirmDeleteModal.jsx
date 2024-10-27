import React from "react";
import styled from "../../constants/styles/styles";

export const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[999]">
      <div className="max-w-[1400px] bg-white p-6 shadow-tooltip">
        <h3 className="font-medium mb-5">Bạn có chắc chắn muốn xóa cuộc trò chuyện này?</h3>
        <div className="modal-actions w-full flex items-center justify-end gap-3">
          <button className={styled.buttonTran} onClick={onClose}>Hủy</button>
          <button className={styled.buttonPrimary} onClick={onConfirm}>Xóa</button>
        </div>
      </div>
    </div>
  );
};
