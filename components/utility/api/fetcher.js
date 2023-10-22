import apiClient from "./apiClient";
import Swal from "sweetalert2";

// Usercontext

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

// Create/Insert New Data
export const post_data = async (name, url, data, closeModal, mutate) => {
  try {
    const response = await apiClient.post(url, data);
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
    console.error(error);
    Swal.fire({
      title: "Error",
      text: error,
      icon: "error",
    });
    throw error;
  }
};

export const put_data = async (name, url, data, closeModal, mutate) => {
  try {
    const response = await apiClient.put(url, data);
    if (response.status === 200) {
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
    console.error(error);
    Swal.fire({
      title: "Error",
      text: error,
      icon: "error",
    });
    throw error;
  }
};

export const delete_data = async (name, url, closeModal, mutate) => {
    try {
      const response = await apiClient.delete(url);
      if (response.status === 200) {
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
      console.error(error);
      Swal.fire({
        title: "Error",
        text: error,
        icon: "error",
      });
      throw error;
    }
  };
  

// Handlers
