import apiClient from "./apiClient";
import Swal from "sweetalert2";
import {
  createAddLogData,
  createEditLogData,
  createRemoveLogData,
} from "../logger";
import { useContext } from "react";
import { UserContext } from "@/contexts/userContext";

// Get all
export const get_fetcher = async (url) => {
  try {
    const response = await apiClient.get(url);
    if (response.status !== 200) {
      const error = new Error();
      error.info = response.data;
      error.status = response.status;
      error.message = "An error occurred while fetching data";
      Swal.fire({
        title: error.info,
        text: error.message,
        icon: "error",
      });
      throw error;
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Get Specific Data
export const get_data = async (url) => {
  try {
    const response = await apiClient.get(url);
    if (response.status !== 200) {
      const error = new Error();
      error.info = response.data;
      error.status = response.status;
      error.message = "An error occurred while fetching data";
      Swal.fire({
        title: error.info,
        text: error.message,
        icon: "error",
      });
      throw error;
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Create/Insert New Data
export const post_data = async (
  name,
  url,
  data,
  closeModal,
  mutate,
  log_data = null
) => {
  try {
    const response = await apiClient.post(url, data);
    if (response.status === 201) {
      if (log_data != null) {
        log_add_data(name, closeModal, mutate, log_data);
      } else {
        closeModal();
        Swal.fire({
          title: "Success",
          text: "Successfully added a/an " + name + ".",
          icon: "success",
        });
        mutate();
      }
    }
  } catch (error) {
    // Handle the error
    console.error(error);
    Swal.fire({
      title: "Error",
      text: error,
      icon: "error",
    });
    throw error;
  }
};

// export const post_order_data = async (
//   name,
//   url,
//   data,
//   closeModal,
//   mutate,
//   log_data = null,
//   transaction_type,
//   branch_id
// ) => {
//   try {
//     const response = await apiClient.post(url, data);
//     if (response.status === 201) {
//       if (log_data != null) {
//         log_add_data(name, closeModal, mutate, log_data);
//       } else {
//         closeModal();
//         Swal.fire({
//           title: "Success",
//           text: "Branch with id: " + branch_id + "successfully created a " + transaction_type + "  order.",
//           icon: "success",
//         });
//         mutate();
//       }
//     }
//   } catch (error) {
//     // Handle the error
//     console.error(error);
//     Swal.fire({
//       title: "Error",
//       text: error,
//       icon: "error",
//     });
//     throw error;
//   }
// };

export const put_data = async (
  name,
  url,
  data,
  closeModal,
  mutate = null,
  log_data = null
) => {
  try {
    const response = await apiClient.put(url, data);
    if (response.status === 200) {
      if (log_data != null) {
        log_edit_data(name, closeModal, mutate, log_data);
      } else {
        closeModal();
        Swal.fire({
          title: "Success",
          text: "Successfully updated a/an " + name + ".",
          icon: "success",
        });
        if (mutate) {
          mutate();
        }
      }
    }
  } catch (error) {
    // Handle the error
    console.error(error);
    Swal.fire({
      title: "Error",
      text: error,
      icon: "error",
    });
    throw error;
  }
};

export const delete_data = async (
  name,
  url,
  closeModal,
  mutate = null,
  log_data = null
) => {
  try {
    const response = await apiClient.delete(url);
    if (response.status === 200) {
      if (log_data != null) {
        log_delete_data(name, closeModal, mutate, log_data);
      } else {
        closeModal();
        Swal.fire({
          title: "Success",
          text: "Successfully deleted a/an " + name + ".",
          icon: "success",
        });
        mutate();
      }
    }
  } catch (error) {
    // Handle the error
    console.error(error);
    Swal.fire({
      title: "Error",
      text: error,
      icon: "error",
    });
    throw error;
  }
};

// Logs

export const log_add_data = async (name, closeModal, mutate, log_data) => {
  try {
    const response = await apiClient.post(`/logs`, log_data);
    if (response.status === 201) {
      closeModal();
      Swal.fire({
        title: "Success",
        text: "Successfully added a/an " + name + ".",
        icon: "success",
      });
      mutate();
    }
  } catch (error) {
    // Handle the error
    Swal.fire({
      title: "Error",
      text: error,
      icon: "error",
    });
    throw error;
  }
};

export const log_edit_data = async (name, closeModal, mutate, log_data) => {
  try {
    const response = await apiClient.post(`/logs`, log_data);
    if (response.status === 201) {
      closeModal();
      Swal.fire({
        title: "Success",
        text: "Successfully updated a/an " + name + ".",
        icon: "success",
      });
      mutate();
    }
  } catch (error) {
    // Handle the error
    Swal.fire({
      title: "Error",
      text: error,
      icon: "error",
    });
    throw error;
  }
};

export const log_delete_data = async (name, closeModal, mutate, log_data) => {
  try {
    const response = await apiClient.post(`/logs`, log_data);
    if (response.status === 201) {
      closeModal();
      Swal.fire({
        title: "Success",
        text: "Successfully deleted a/an " + name + ".",
        icon: "success",
      });
      mutate();
    }
  } catch (error) {
    // Handle the error
    Swal.fire({
      title: "Error",
      text: error,
      icon: "error",
    });
    throw error;
  }
};

// Handlers
