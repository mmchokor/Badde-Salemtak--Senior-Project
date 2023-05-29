import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../constants/apiURL";

// data should include const { listing, serviceFee, deliveryFee, date, message }
const createOrder = async (data) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.post(`${API_URL}/order`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create order");
  }
};

const getOrdersByListing = async (listingId) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${API_URL}/order/listing/${listingId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get orders");
  }
};

const getOrderById = async (orderId) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${API_URL}/order/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.order;
  } catch (error) {
    console.log(error);
  }
};

async function acceptOrder(orderId) {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.patch(
      `${API_URL}/order/${orderId}/accepted`,
      {
        status: "accepted",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    // Handle any errors that occur during the request
    console.error(error);
    throw new Error("Failed to accept order");
  }
}

async function getAcceptedOrdersByUser() {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${API_URL}/order/me/resident`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    // Handle any errors that occur during the request
    console.error(error);
    throw new Error("Failed to get accepted orders");
  }
}

async function getPendingDeliveryForTraveller() {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${API_URL}/order/me/traveller`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    // Handle any errors that occur during the request
    console.error(error);
    throw new Error("Failed to get pending deleveries for Traveler");
  }
}

async function confirmOrderDelivered(orderId) {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await axios.patch(
      `${API_URL}/order/${orderId}/delivered`,
      {
        status: "completed",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // Handle the response data
    return response.data.data;
  } catch (error) {
    // Handle error
    console.error(error.response.data);
    throw new Error("Failed to confirm delivery");
  }
}

async function getCompletedOrders () {
  try {
    const token = await AsyncStorage.getItem('token');

    const response = await axios.get(`${API_URL}/order/me/completed/resident`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.completedOrders.reverse();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch completed orders');
  }
};
async function getCompletedDeliveries  () {
  try {
    const token = await AsyncStorage.getItem('token');

    const response = await axios.get(`${API_URL}/order/me/completed/traveller`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //console.log(response.data.data.completedOrders.reverse())
    return response.data.data.completedOrders.reverse();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch completed orders');
  }
};

module.exports = {
  createOrder,
  getOrdersByListing,
  getOrderById,
  acceptOrder,
  getAcceptedOrdersByUser,
  getPendingDeliveryForTraveller,
  confirmOrderDelivered,
  getCompletedOrders,
  getCompletedDeliveries
};
