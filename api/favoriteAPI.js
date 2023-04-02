import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '../constants/apiURL';

// Set up an instance of axios with the base URL
const api = axios.create({
	baseURL: API_URL + '/favorite',
});

/**
 * Adds a listing to the user's favorites
 * @param {User} user
 * @param {Listing} listing
 * @param {ListingType} listingType
 * @returns {Favorite} The newly created favorite object
 */
const createFavorite = async (formData) => {
	const token = await AsyncStorage.getItem('token');
	try {
		// POST the favorite data to the API
		const { data } = await axios.post(`${API_URL}/favorite/`, formData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		// Return the data from the API
		return data;
	} catch (error) {
		console.error(error);
		throw new Error('Failed to add favorite listing');
	}
};

/**
 * getFavoritesByUser is a function that returns the user's favorite listings
 * @param userId: The id of the user
 * @returns {data.data.favorite}: The user's favorite listings
 */
const getFavoritesByUser = async (userId) => {
	try {
		const token = await AsyncStorage.getItem('token');

		const { data } = await api.get(`/users/${userId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return data.Favorites;
	} catch (error) {
		console.error(error);
		throw new Error('Failed to get favorite listings');
	}
};

/**
 * Delete a listing from the favorites list
 * @param {string} id - The id of the listing to delete
 * @returns {boolean} - Returns true if the listing was deleted
 * @throws {Error} - Throws an error if the deletion failed
 */
const deleteFavorite = async (id) => {
	try {
		const token = await AsyncStorage.getItem('token');

		const { data } = await api.delete(`/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return data.success;
	} catch (error) {
		console.error(error);
		throw new Error('Failed to delete favorite listing');
	}
};

module.exports = {
	createFavorite,
	getFavoritesByUser,
	deleteFavorite,
};
