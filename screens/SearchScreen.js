import {
	View,
	Text,
	StyleSheet,
	FlatList,
	SafeAreaView,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';
import { getResidentListings } from '../api/residentListingsAPI';
import useDebounce from '../components/UI/useDebounce';
import Listing from '../components/Item/Listing';
import { Colors } from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import LoadingIcon from '../components/Loading/LoadingIcon';
function SearchScreen() {
	const navigation = useNavigation();
	const [search, setSearch] = useState('');
	const debouncedSearchTerm = useDebounce(search, 200);

	const [selectedButton, setSelectedButton] = useState(null);
	const [placeHolder, setPlaceHolder] = useState('Search Item');
	const [attribute, setAttribute] = useState('name');
	const handlePress = (buttonNumber) => {
		if (selectedButton === buttonNumber) {
			setSelectedButton(null);

			setPlaceHolder('Search Item');
			setAttribute('name');
		} else {
			setSelectedButton(buttonNumber);
			if (buttonNumber == 1) {
				setPlaceHolder('Search Item by Name');
				setAttribute('name');
			} else if (buttonNumber == 2) {
				setPlaceHolder('Search Item by Location');
				setAttribute('Location');
			} else if (buttonNumber == 3) {
				setPlaceHolder('Search Item by Type');
				setAttribute('Type');
			}
		}
	};
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
	const filteredListingsName = debouncedSearchTerm
		? residentListings.filter((listing) =>
				listing.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
		  )
		: [];
	const filteredListingsLocation = debouncedSearchTerm
		? residentListings.filter((listing) =>
				listing.cityOfResidence
					.toLowerCase()
					.includes(debouncedSearchTerm.toLowerCase()),
		  )
		: [];
	const filteredListingsType = debouncedSearchTerm
		? residentListings.filter((listing) =>
				listing.productType
					.toLowerCase()
					.includes(debouncedSearchTerm.toLowerCase()),
		  )
		: [];
	if (isLoading) {
		return <LoadingIcon />;
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{flex:1}}>
				<TextInput
					style={styles.textInp}
					value={search}
					placeholder={placeHolder}
					underlineColorAndroid='transparent'
					onChangeText={(text) => setSearch(text)}
				/>

				<View style={styles.container}>
					<TouchableOpacity
						style={[
							styles.button,
							selectedButton === 1 && styles.selectedButton,
						]}
						onPress={() => handlePress(1)}
					>
						<Text style={styles.buttonText}>Name</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[
							styles.button,
							selectedButton === 2 && styles.selectedButton,
						]}
						onPress={() => handlePress(2)}
					>
						<Text style={styles.buttonText}>Location</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[
							styles.button,
							selectedButton === 3 && styles.selectedButton,
						]}
						onPress={() => handlePress(3)}
					>
						<Text style={styles.buttonText}>Type</Text>
					</TouchableOpacity>
				</View>
				{attribute === 'name' && (
					<FlatList
						refreshing={isFetching}
						windowSize={10}
						onRefresh={() => refetch()}
						showsVerticalScrollIndicator={false}
						data={filteredListingsName}
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
				)}
				{attribute === 'Location' && (
					<FlatList
						refreshing={isFetching}
						windowSize={10}
						onRefresh={() => refetch()}
						showsVerticalScrollIndicator={false}
						data={filteredListingsLocation}
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
				)}
				{attribute === 'Type' && (
					<FlatList
						refreshing={isFetching}
						windowSize={10}
						onRefresh={() => refetch()}
						showsVerticalScrollIndicator={false}
						data={filteredListingsType}
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
				)}
			
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
		borderColor: Colors.darkGreen,
		backgroundColor: 'white',
	},
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',

		marginVertical: 10,
	},
	button: {
		backgroundColor: 'white',
		paddingVertical: 10,
		paddingHorizontal: 20,
		marginHorizontal: 10,
		borderRadius: 12,
		borderWidth: 0.5,
		borderColor: Colors.darkGreen,
	},
	selectedButton: {
		backgroundColor: Colors.white,
		paddingVertical: 10,
		paddingHorizontal: 20,
		marginHorizontal: 10,
		borderRadius: 12,
		borderWidth: 1.2,
		borderColor: Colors.darkGreen,
	},
	buttonText: {
		color: Colors.black,
	},
});
