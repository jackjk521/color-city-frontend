import apiClient from "../../components/utility/api/apiClient";


export const brandsFetcher = async () => {
  try {
    const response = await apiClient.get("/brands");
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

export const categoriesFetcher = async () => {
  try {
    const response = await apiClient.get("/categories");
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

export const suppliersFetcher = async () => {
  try {
    const response = await apiClient.get("/suppliers");
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
