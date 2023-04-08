import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useMutation, useQuery } from 'react-query';
import { createFavorite, deleteFavorite } from '../../api/favoriteAPI';
import { Colors } from '../../constants/colors';
import { favorites, isFavScreenAtom } from '../../store/Favorites/favorites';

const ListingOptions = ({
	id,
	title,
	location,
	rating,
	type,
	price,
	quantity,
	weight,
	username,
	imageSrc,
	timePosted,
	moreD,
	prefPayment,
}) => {
	const [fav, setFav] = useAtom(favorites);
	const [isFavScreen] = useAtom(isFavScreenAtom);
	const [isFavorite, setIsFavorite] = useState(fav.includes(id));

	const { mutate, error } = useMutation(createFavorite);
	const del = useMutation(deleteFavorite);

	const modifyFavorite = async () => {
		if (!isFavorite) {
			addToFavorites();
			setFav([
				...fav,
				{
					id,
					title,
					location,
					rating,
					type,
					price,
					quantity,
					weight,
					username,
					imageSrc,
					timePosted,
					moreD,
					prefPayment,
				},
			]);
			setIsFavorite(true);
		} else {
			setFav(fav.filter((item) => item.id !== id));
			setIsFavorite(false);
			//const listing = id.toString();

			// must pass favorite id
			// find from jotai state
			// filter the jotai array get the item he pressed
			// pass the favorite id.
			//del.mutate('643134bb34a66a50ffc20484');
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
			{!isFavScreen && (
				<FontAwesome
					style={styles.optionsIcon}
					name={isFavorite ? 'bookmark' : 'bookmark-o'}
					size={18}
					color={isFavorite ? Colors.red : Colors.gray}
					onPress={modifyFavorite}
				/>
			)}
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
