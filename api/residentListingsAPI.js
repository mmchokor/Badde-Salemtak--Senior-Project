import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { API_URL } from '../constants/apiURL'

// Get all resident listings
const getResidentListings = async () => {
   const token = await AsyncStorage.getItem('token')
   try {
      const response = await axios.get(`${API_URL}/resident`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      })
      return response.data.data.residentListings
   } catch (error) {
      throw error
   }
}

// Get a single resident listing by ID
const getResidentListingById = async (token, id) => {
   try {
      const response = await axios.get(`${API_URL}/resident/${id}`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      })
      return response.data.data.residentListing
   } catch (error) {
      throw error.response.data
   }
}

// Create a new resident listing
const createResidentListing = async (data) => {
   const token = await AsyncStorage.getItem('token')
   try {
      const response = await axios.post(`${API_URL}/resident`, data, {
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
         },
      })
	  //console.log(response)
      return response
   } catch (error) {
      console.error(error)
      throw new Error('Failed to add resident listing' + error)
   }
}

// Update an existing resident listing by ID
const updateResidentListing = async (id, data) => {
   try {
      const response = await axios.patch(`${API_URL}/resident/${id}`, data, {
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
         },
      })
      return response.data.data.updatedResidentListing
   } catch (error) {
      throw error.response.data
   }
}

// Delete a resident listing by ID
const deleteResidentListingById = async (id, token) => {
   try {
      const response = await axios.delete(`${API_URL}/resident/${id}`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      })
      return response.data.status
   } catch (error) {
      throw error.response.data
   }
}

export {
	createResidentListing,
	deleteResidentListingById,
	getResidentListingById,
	getResidentListings,
	updateResidentListing
}

