import {
	View,
	Text,
	StyleSheet,
	FlatList,
	SafeAreaView,
	TextInput,
} from 'react-native';
import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';
import { getResidentListings } from '../api/residentListingsAPI';
import useDebounce from '../components/UI/useDebounce';
import Listing from '../components/Item/Listing';
import { Colors } from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
function SearchScreen() {
    const navigation =useNavigation();
	const [search, setSearch] = useState('');
	const debouncedSearchTerm = useDebounce(search, 200);

	const {
		status,
		data: residentListings,
		isError,
		error,
		isLoading,
		refetch,
		isFetching,
	} = useQuery('traverlerLisitngs', getResidentListings);

	// const filteredListings = residentListings.filter((listing) =>
	// 	listing.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
	// );
	const filteredListings = debouncedSearchTerm
		? residentListings.filter((listing) =>
				listing.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
		  )
		: [];
        
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View>
				<TextInput
					style={styles.textInp}
					value={search}
					placeholder='Search Here'
					underlineColorAndroid='transparent'
					onChangeText={(text) => setSearch(text)}
				/>

				<FlatList
					refreshing={isFetching}
					windowSize={10}
					onRefresh={() => refetch()}
					showsVerticalScrollIndicator={false}
					data={filteredListings}
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
		</SafeAreaView>
	);
}

export default SearchScreen;

const styles = StyleSheet.create({
	itemStyle: {
		padding: 15,
	},
	textInp: {
		height: 50,
		borderWidth: 1.2,
		borderRadius: 20,
		paddingLeft: 20,
		margin: 5,
		borderColor:Colors.darkGreen,
		backgroundColor: 'white',
	},
});
