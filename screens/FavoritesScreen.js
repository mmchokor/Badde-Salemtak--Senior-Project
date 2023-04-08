import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native';
import { useAtom } from 'jotai';
import { favorites } from '../store/Favorites/favorites';
import { useQuery } from 'react-query';
import Listing from '../components/Item/Listing';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/colors';
import { useState, useCallback } from 'react';
import { getFavoritesByUser } from '../api/favoriteAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

function FavoritesScreen() {
	const navigation = useNavigation();
	const [fav, setFav] = useAtom(favorites);
	const [refresh, setRefresh] = useState(false);
	const {
		status,
		data: Favorites,
		isError,
		error,
		isLoading,
		refetch,
	} = useQuery('Favorites', async () =>
		getFavoritesByUser(await AsyncStorage.getItem('userID')),
	);

	let onRefresh = useCallback(() => {
		setRefresh(true);
		refetch().then(() => setRefresh(false));
	}, []);

	// global state --> setFavorites()
	// in this array u also have favorite Id.

	if (isLoading) {
		return (
			<View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
				<Text>Loading</Text>
			</View>
		);
	}

	if (isError) {
		return <Text>{error.message}</Text>;
	}
	//console.log(fav[0]);
	return (
		<View style={styles.wrapper}>
			<FlatList
				refreshControl={
					<RefreshControl refreshing={refresh} onRefresh={onRefresh} />
				}
				showsVerticalScrollIndicator={false}
				data={Favorites}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => (
					// <Listing
					// 	onPress={() =>
					// 		navigation.navigate('ItemDetails', {
					// 			id: item.id,
					// 			title: item.title,
					// 			location: item.location,
					// 			rating: 4,
					// 			type: item.type,
					// 			price: item.price,
					// 			quantity: item.quantity,
					// 			weight: item.weight,
					// 			username: item.username,
					// 			imageSrc: item.imageSrc,
					// 			timePosted: item.timePosted,
					// 			moreD: item.moreD,
					// 			prefPayment: item.prefPayment,
					// 		})
					// 	}
					// 	id={item._id}
					// 	title={item.title}
					// 	location={item.location}
					// 	rating={4}
					// 	type={item.type}
					// 	price={item.price}
					// 	quantity={item.quantity}
					// 	weight={item.weight}
					// 	username={item.username}
					// 	imageSrc={item.imageSrc}
					// 	timePosted={item.timePosted}
					// 	moreD={item.moreD}
					// 	prefPayment={item.prefPayment}
					// 	color={fav ? Colors.red : Colors.gray}
					// />
					// <Text>

					// 	{/* getting the user id */}
					// 	{/* {console.log("here " + item)} */}

					// </Text>

					<Listing
						onPress={() =>
							navigation.navigate('ItemDetails', {
								id: item.listing._id,
								title: item.listing.name,
								location: item.listing.cityOfResidence,
								rating: 4,
								type: item.listing.productType,
								price: item.listing.price,
								quantity: item.listing.quantity,
								weight: item.listing.approximateWeight,
								username:
									item.listing.user.firstname +
									' ' +
									item.listing.user.lastname,
								imageSrc: item.listing.imageCover,
								timePosted: item.listing.createdAt,
								moreD: item.listing.description,
								prefPayment: item.listing.paymentMethod,
							})
						}
						id={item._id}
						title={item.listing.name}
						location={item.listing.cityOfResidence}
						rating={4}
						type={item.listing.productType}
						price={item.listing.price}
						quantity={item.listing.quantity}
						weight={item.listing.approximateWeight}
						username={
							item.listing.user.firstname + ' ' + item.listing.user.lastname
						}
						imageSrc={item.listing.imageCover}
						timePosted={item.listing.createdAt}
						moreD={item.listing.description}
						prefPayment={item.listing.paymentMethod}
						color={fav ? Colors.red : Colors.gray}
					/>
				)}
			/>
		</View>
	);
}
export default FavoritesScreen;

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		marginHorizontal: 4, //15
	},
});
