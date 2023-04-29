import { useNavigation } from '@react-navigation/native';
import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	View,
	RefreshControl,
} from 'react-native';
import { useQuery } from 'react-query';
import { getResidentListings } from '../../api/residentListingsAPI';
import LoadingIcon from '../Loading/LoadingIcon';
//import { useState, useCallback } from 'react';
import Listing from './Listing';

const ListingList = () => {
	const navigation = useNavigation();
	//const [refresh, setRefresh] = useState(false);
	// i want use React query to get data from my server
	const {
		status,
		data: residentListings,
		isError,
		error,
		isLoading,
		refetch,
		isFetching,
	} = useQuery('traverlerLisitngs', getResidentListings, { staleTime: 0 });

	if (isLoading) {
		//return <Text>Loading...</Text>
		return <LoadingIcon />;
	}
	// let onRefresh = useCallback(() => {
	// 	setRefresh(true);
	// 	refetch().then(() => setRefresh(false));
	// }, []);
	if (isError) {
		return <Text>{error.message}</Text>;
	}
	//console.log(residentListings[0].imageCover)
	
	return (
		<View style={styles.wrapper}>
			<FlatList
				// refreshControl={
				// 	<RefreshControl refreshing={refresh} onRefresh={onRefresh} />
				// }
				refreshing={isFetching}
				windowSize={10}
				onRefresh={() => refetch()}
				showsVerticalScrollIndicator={false}
				data={residentListings}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => (
					<Listing
						onPress={() =>
							navigation.navigate('ItemDetails', {
								id: item._id,
								title: item.name,
								location: item.cityOfResidence,
								rating: 4,
								type: item.productType,
								price: item.price,
								quantity: item.quantity,
								weight: item.approximateWeight,
								username: item.user.firstname + ' ' + item.user.lastname,
								imageSrc: item.imageCover,
								timePosted: item.createdAt,
								moreD: item.description,
								prefPayment: item.paymentMethod,
								userId: item.user._id
							})
						}
						id={item._id}
						title={item.name}
						location={item.cityOfResidence}
						rating={4}
						type={item.productType}
						price={item.price}
						quantity={item.quantity}
						weight={item.approximateWeight}
						username={item.user.firstname + ' ' + item.user.lastname}
						imageSrc={item.imageCover}
						timePosted={item.createdAt}
						moreD={item.description}
						prefPayment={item.paymentMethod}
					/>
				)}
			/>
		</View>
	);
};

export default ListingList;

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		marginHorizontal: 4, //15
		marginTop: 20
	},
});
