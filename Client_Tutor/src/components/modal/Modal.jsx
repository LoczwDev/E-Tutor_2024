import React from "react";
import "../../assets/css/modal.css";
import Login from "../auth/Login";
import Register from "../auth/Register";

const Modal = () => {
  const handleCloseModal = (active) => {
    const modal = document.getElementById(active);
    if (modal) {
      modal.classList.remove("modal-open");
    }
  };

  return (
    <>
      {/* Login */}
      <dialog id="login" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button
              type="button" // Change type to button to prevent form submission
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => handleCloseModal("login")} // Use arrow function here
            >
              ✕
            </button>
          </form>
          <Login />
        </div>
      </dialog>
      {/* end login */}

      {/* Register */}
      {/* <dialog id="register" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button
              type="button" // Change type to button to prevent form submission
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => handleCloseModal("register")} // Use arrow function here
            >
              ✕
            </button>
          </form>
          <Register />
        </div>
      </dialog> */}
      {/* end register */}
    </>
  );
};

export default Modal;
