import {
	StyleSheet,
	Text,
	View,
	FlatList,
	RefreshControl,
	ScrollView,
} from 'react-native';
import { useAtom } from 'jotai';
import { favorites, isFavScreenAtom } from '../store/Favorites/favorites';
import { useQuery } from 'react-query';
import Listing from '../components/Item/Listing';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/colors';
import { useState, useCallback, useEffect } from 'react';
import { getFavoritesByUser } from '../api/favoriteAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import LoadingIcon from '../components/Loading/LoadingIcon';
import ResidentListing from '../components/Item/ResidentListing';
function ResidentFavScreen() {
	const [favArray, setFavArray] = useAtom(favorites);

	const navigation = useNavigation();

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

	useEffect(() => {
		if (Favorites) {
			Favorites.forEach((item) => {
				const index = favArray.findIndex((fav) => fav === item.listing._id);
				if (index === -1) {
					setFavArray((prev) => [...prev, item.listing._id]);
				}
			});
		}
	}, [Favorites, setFavArray]);

	//console.log("In the Favorite Array",favArray);
	if (isLoading) {
		return <LoadingIcon />;
	}

	if (isError) {
		return <Text>{error.message}</Text>;
	}

	if (Favorites[0] === null) {
		return (
			<ScrollView
				contentContainerStyle={{
					justifyContent: 'center',
					alignItems: 'center',
					flex: 1,
				}}
				refreshControl={
					<RefreshControl refreshing={refresh} onRefresh={onRefresh} />
				}
			>
				<Text>No Favorite Added</Text>
			</ScrollView>
		);
	}

	return (
		<View style={styles.wrapper}>
			<FlatList
				refreshControl={
					<RefreshControl refreshing={refresh} onRefresh={onRefresh} />
				}
				showsVerticalScrollIndicator={false}
				data={Favorites}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) =>
					item.listingType === 'traverlerListing' && (
						<ResidentListing
							onPress={() =>
								navigation.navigate('LocationDetails', {
									id: item.listing._id,
									toLocation: 'Lebanon',
									fromLocation: item.listing.country,
									rating: 4,
									maxWeight: item.listing.extraWeight,
									username: item.user.firstname + ' ' + item.user.lastname, //imageSrc: item.imageSrc,//should we remove it?
									timePosted: item.listing.date,
									userLocation: item.listing.residentCity,
									//prefPayment: item.prefPayment,//?
									moreD: item.listing.description,
									//type: item.type,//??
									FavId: item._id,
								})
							}
							id={item.listing._id}
							toLocation={'Lebanon'}
							fromLocation={item.listing.country}
							rating={4}
							maxWeight={item.listing.extraWeight}
							username={item.user.firstname + ' ' + item.user.lastname}
							//imageSrc={item.imageSrc}//should we remove it?
							timePosted={item.listing.date}
							userLocation={item.listing.residentCity}
							//prefPayment={item.prefPayment}//?
							moreD={item.listing.description}
							//type={item.type}//?
							FavId={item._id}
						/>
					)
				}
			/>
		</View>
	);
}
export default ResidentFavScreen;
const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		marginHorizontal: 4, //15
		marginTop: 5,
	},
});
