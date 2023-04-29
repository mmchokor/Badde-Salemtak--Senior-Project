import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../constants/apiURL";
import { useAtom } from "jotai";
import { isLoading } from "../store/AddItemLoading/AddItemLoading";

// Get all resident listings
const getResidentListings = async () => {
  const token = await AsyncStorage.getItem("token");
  try {
    const response = await axios.get(`${API_URL}/resident`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.residentListings;
  } catch (error) {
    throw error;
  }
};

// Get a single resident listing by ID
const getResidentListingById = async (id) => {
  const token = await AsyncStorage.getItem("token");
  try {
    
    const response = await axios.get(`${API_URL}/resident/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.residentListing;
  } catch (error) {
    throw error.response.data;
  }
};

const getResidentListingByUserId = async (userId) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const body = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_URL}/resident/user/${userId}`, body);
    return response.data.data.residentListings;
  } catch (err) {
    console.log(err);
    throw new Error("Error fetching resident Data");
  }
};

// Create a new resident listing
const createResidentListing = async (data) => {
  const token = await AsyncStorage.getItem("token");
  try {
    const response = await axios.post(`${API_URL}/resident`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progress) => {
        const percentCompleted = Math.round(
          (progress.loaded / progress.total) * 100
        );
        //console.log(`Loading progress: ${percentCompleted}%`);
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add resident listing" + error);
  }
};

// Update an existing resident listing by ID
const updateResidentListing = async (id, data) => {
  try {
    const response = await axios.patch(`${API_URL}/resident/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data.data.updatedResidentListing;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete a resident listing by ID
const deleteResidentListingById = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/resident/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.status;
  } catch (error) {
    throw error.response.data;
  }
};

export {
  createResidentListing,
  deleteResidentListingById,
  getResidentListingById,
  getResidentListings,
  updateResidentListing,
  getResidentListingByUserId
};
