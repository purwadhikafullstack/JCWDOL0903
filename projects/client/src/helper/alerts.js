import Swal from "sweetalert2";

function successAlert(message = "") {
  Swal.fire({
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
}

function errorAlert() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Something went wrong!",
    confirmButtonColor: "#06b6d4",
  });
}

async function deleteConfirmationAlert(cb = () => {}) {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#06b6d4",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });
  if (result.isConfirmed) {
    cb();
  }
}

export { successAlert, errorAlert, deleteConfirmationAlert };
