"use client";

import { ToastContainer } from "react-toastify";

export default function ToastifyProvider() {
  return (
    <ToastContainer
      pauseOnFocusLoss
      draggable
      pauseOnHover
      position="top-center"
      autoClose={5000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      theme="colored"
    />
  );
}
