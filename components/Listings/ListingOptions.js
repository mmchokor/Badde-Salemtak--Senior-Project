import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useMutation, useQuery } from 'react-query';
import { createFavorite, deleteFavorite } from '../../api/favoriteAPI';
import { Colors } from '../../constants/colors';
import { favorites } from '../../store/Favorites/favorites';

const ListingOptions = ({ id }) => {
	const [fav, setFav] = useAtom(favorites);
	const [isFavorite, setIsFavorite] = useState(fav.includes(id));
	const { mutate, error } = useMutation(createFavorite);
	const del = useMutation(deleteFavorite);

	const modifyFavorite = async () => {
		// console.log(id);
		if (!isFavorite) {
			addToFavorites();
			setFav([...fav, id]);
			setIsFavorite(true);
		} else {
			setFav(fav.filter((item) => item !== id));
			setIsFavorite(false);
			const listing = id.toString();
			del.mutate({ listing });
			
		}
	};

	const addToFavorites = async () => {
		const user = await AsyncStorage.getItem('userID');
		const listing = id.toString();
		const listingType = 'residentListing';

		const data = {
			user,
			listing,
			listingType,
		};

		mutate(data);
	};

	const optionsHandler = () => {
		console.log('Clicked 2:');
	};

	return (
		<View style={styles.optionsWrapper}>
			<FontAwesome
				style={styles.optionsIcon}
				name={isFavorite ? 'bookmark' : 'bookmark-o'}
				size={18}
				color={isFavorite ? Colors.red : Colors.gray}
				onPress={modifyFavorite}
			/>
			<SimpleLineIcons
				style={styles.optionsIcon}
				name='options-vertical'
				size={16}
				color={Colors.gray}
				onPress={optionsHandler}
			/>
		</View>
	);
};

export default ListingOptions;

const styles = StyleSheet.create({
	optionsWrapper: {
		flexDirection: 'row',
		position: 'absolute',
		right: 3,
		zIndex: 100,
	},
	optionsIcon: {
		paddingHorizontal: 5,
		paddingVertical: 5,
	},
});
