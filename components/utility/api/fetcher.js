import apiClient from "./apiClient";
import Swal from "sweetalert2";

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
          text: "Successfully created a/an " + name + ".",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
        mutate();
      }
    }
  } catch (error) {
    // Handle the error
    console.error(error);
    Swal.fire({
      title: "Error",
      text: error.response.data.message,
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
    throw error;
  }

  //   Swal.fire({
  //     title: "User Created",
  //     text: response.data.message,
  //     icon: "success",
  //     showConfirmButton: false,
  //     timer: 2000,
  //   });
  // } catch (error) {
  //   Swal.fire({
  //     title: "User not created",
  //     text: error.response.data.message,
  //     icon: "error",
  //     showConfirmButton: false,
  //     timer: 2000,
  //   });
  // }
};
// Update data
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
          showConfirmButton: false,
          timer: 2000,
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
      text: error.response.data.message,
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
    throw error;
  }
};

// Update purchase status
export const put_order_data = async (
  name,
  url,
  data,
  closeModal,
  mutate,
  log_data = null
) => {
  try {
    const response = await apiClient.put(url, data);
    if (response.status === 200) {
      if (log_data != null) {
        if (data.status == "APPROVE") {
          log_approve_purchase_data(name, closeModal, mutate, log_data);
        } else if (data.status == "DECLINE") {
          log_decline_purchase_data(name, closeModal, mutate, log_data);
        } else if (data.status == "POST") {
          log_post_purchase_data(name, closeModal, mutate, log_data);
        }
      } else {
        // closeModal();
        // Swal.fire({
        //   title: "Success",
        //   text:
        //     "Branch with id: " +
        //     branch_id +
        //     "successfully created a " +
        //     transaction_type +
        //     "  order.",
        //   icon: "success",
        // });
        // mutate();
      }
    }
  } catch (error) {
    // Handle the error
    console.error(error);
    Swal.fire({
      title: "Error",
      text: error.response.data.message,
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
    throw error;
  }
};

// Delete data
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
          showConfirmButton: false,
          timer: 2000,
        });
        mutate();
      }
    }
  } catch (error) {
    // Handle the error
    console.error(error);
    Swal.fire({
      title: "Error",
      text: error.response.data.message,
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
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
        text: "Successfully created a/an " + name + ".",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      mutate();
    }
  } catch (error) {
    // Handle the error
    Swal.fire({
      title: "Error",
      text: error.response.data.message,
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
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
        showConfirmButton: false,
        timer: 2000,
      });
      mutate();
    }
  } catch (error) {
    // Handle the error
    Swal.fire({
      title: "Error",
      text: error.response.data.message,
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
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
        showConfirmButton: false,
        timer: 2000,
      });
      mutate();
    }
  } catch (error) {
    // Handle the error
    Swal.fire({
      title: "Error",
      text: error.response.data.message,
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
    throw error;
  }
};

// Purchases Logs
// Branch Orders Status changes: Posted, Approve, Decline
export const log_post_purchase_data = async (
  name,
  closeModal,
  mutate,
  log_data
) => {
  try {
    const response = await apiClient.post(`/logs`, log_data);
    if (response.status === 201) {
      closeModal();
      Swal.fire({
        title: "Success",
        text: "Successfully posted a " + name + ".",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      mutate();
    }
  } catch (error) {
    // Handle the error
    Swal.fire({
      title: "Error",
      text: error.response.data.message,
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
    throw error;
  }
};
export const log_approve_purchase_data = async (
  name,
  closeModal,
  mutate,
  log_data
) => {
  try {
    const response = await apiClient.post(`/logs`, log_data);
    if (response.status === 201) {
      closeModal();
      Swal.fire({
        title: "Success",
        text: "Successfully approved a " + name + ".",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      mutate();
    }
  } catch (error) {
    // Handle the error
    Swal.fire({
      title: "Error",
      text: error.response.data.message,
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
    throw error;
  }
};
export const log_decline_purchase_data = async (
  name,
  closeModal,
  mutate,
  log_data
) => {
  try {
    const response = await apiClient.post(`/logs`, log_data);
    if (response.status === 201) {
      closeModal();
      Swal.fire({
        title: "Success",
        text: "Successfully declined a " + name + ".",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      mutate();
    }
  } catch (error) {
    // Handle the error
    Swal.fire({
      title: "Error",
      text: error.response.data.message,
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
    throw error;
  }
};
// Handlers
