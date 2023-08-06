import { toast } from "react-toastify";

export const handleError = (error: string) => {
  toast.error(error, {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
