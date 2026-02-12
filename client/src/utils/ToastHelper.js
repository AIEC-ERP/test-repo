import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const showErrorToast = (message) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    theme: "light",
    className: "custom-toast"
  });
};


export const showSuccessToast = (message) => {
toast.success(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    theme: "light",
    className: "custom-toast"
  });
 
};

 