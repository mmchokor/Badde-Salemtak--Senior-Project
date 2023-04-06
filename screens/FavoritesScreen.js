import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useAtom } from 'jotai';
import { favorites } from '../store/Favorites/favorites';
import { useQuery } from 'react-query';
import Listing from '../components/Item/Listing';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/colors';

import { getFavoritesByUser } from '../api/favoriteAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

function FavoritesScreen() {
	const navigation = useNavigation();
	const [fav, setFav] = useAtom(favorites);

	const { status, data: Favorites, isError, error, isLoading } = useQuery(
		'Favorites',
		async () => getFavoritesByUser(await AsyncStorage.getItem('userID')),
	);

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
	return (
		<View style={styles.wrapper}>
			<FlatList
				showsVerticalScrollIndicator={false}
				data={Favorites}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => (
					<Text>
						{/* getting the user id */}

						{console.log("here" + item._id)}
					</Text>
				
					// <Listing
					// 	onPress={() =>
					// 		navigation.navigate('ItemDetails', {
					// 			id: item._id,
					// 			title: item.name,
					// 			location: item.cityOfResidence,
					// 			rating: 4,
					// 			type: item.productType,
					// 			price: item.price,
					// 			quantity: item.quantity,
					// 			weight: item.approximateWeight,
					// 			username: item.user.firstname + ' ' + item.user.lastname,
					// 			imageSrc: item.imageCover,
					// 			timePosted: item.createdAt,
					// 			moreD: item.description,
					// 			prefPayment: item.paymentMethod,
					// 		})
					// 	}
					// 	id={item._id}
					// 	title={item.name}
					// 	location={item.cityOfResidence}
					// 	rating={4}
					// 	type={item.productType}
					// 	price={item.price}
					// 	quantity={item.quantity}
					// 	weight={item.approximateWeight}
					// 	username={item.user.firstname + ' ' + item.user.lastname}
					// 	imageSrc={item.imageCover}
					// 	timePosted={item.createdAt}
					// 	moreD={item.description}
					// 	prefPayment={item.paymentMethod}
					// 	color={fav ? Colors.red : Colors.gray}
					// />
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
