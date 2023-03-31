import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { favorites } from '../../store/Favorites/favorites';
import { useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { createFavorite } from '../../api/favoriteAPI';
const ListingOptions = ({ id }) => {
	const [fav, setFav] = useAtom(favorites);
	const [isFavorite, setIsFavorite] = useState(fav.includes(id));
	const { mutate, error } = useMutation(createFavorite);
	const addToFavorites = () => {
		console.log(id);
		if (!isFavorite) {
			setFav([...fav, id]);
			setIsFavorite(true);
		} else {
			setFav(fav.filter((item) => item !== id));
			setIsFavorite(false);
		}
		const userId = '641efa8915219b62c1c9d86b';
		const listingId = id.toString();
		const type = 'residentListing';

		const data = {
			userId,
			listingId,
			type,
		};

		mutate(data);
		console.log('Done');
	};

	const optionsHandler = () => {
		console.log('clicked2');
	};

	return (
		<View style={styles.optionsWrapper}>
			<FontAwesome
				style={styles.optionsIcon}
				name={isFavorite ? 'bookmark' : 'bookmark-o'}
				size={18}
				color={isFavorite ? Colors.red : Colors.gray}
				onPress={addToFavorites}
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
