'use client'

import { Slide, ToastContainer } from "react-toastify";
import { ToastCloseButton } from "./ToastCloseButton";
import "react-toastify/ReactToastify.css";
import "@/components/styles/toast.css";

export const ToastLayout = () => {
  return (
    <ToastContainer
      autoClose={2000}
      stacked
      limit={3}
      hideProgressBar
      transition={Slide}
      draggablePercent={20}
      closeButton={ToastCloseButton}
    />
  );
};
