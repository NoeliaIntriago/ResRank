import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const showAlert = (title, text, icon) => {
  return MySwal.fire({
    title,
    text,
    icon,
    confirmButtonText: "Ok",
  });
};

export const showErrorAlert = (title, text) => {
  return MySwal.fire({
    title,
    text,
    icon: "error",
    confirmButtonText: "Ok",
  });
};
