import React from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import Modal from "../modal/Modal";
import Register from "../auth/Register";

export const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <Modal />
      <Register />
    </>
  );
};
