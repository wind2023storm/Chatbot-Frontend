import toast, { Toaster } from "react-hot-toast";
import { React } from "react";

const notification = (type, message) => {
  // To do in here
  if (type === "error") {
    toast.error(message);
  }
  if (type === "success") {
    toast.success(message);
  }
};

export default notification;
