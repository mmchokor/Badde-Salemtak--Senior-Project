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
import { getTravelerListings } from '../api/travelerListingAPI';
import useDebounce from '../components/UI/useDebounce';
import Listing from '../components/Item/Listing';
import { Colors } from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import LoadingIcon from '../components/Loading/LoadingIcon';
import ResidentListing from '../components/Item/ResidentListing';
function SearchScreenResident() {
	const navigation = useNavigation();
	const [search, setSearch] = useState('');
	const debouncedSearchTerm = useDebounce(search, 200);

	const [selectedButton, setSelectedButton] = useState(null);
	const [placeHolder, setPlaceHolder] = useState('Search here');
	const [attribute, setAttribute] = useState('country');
	const {
		status,
		data: travelerListings,
		isError,
		error,
		isLoading,
		refetch,
		isFetching,
	} = useQuery('residentListings', getTravelerListings);

	const handlePress = (buttonNumber) => {
		if (selectedButton === buttonNumber) {
			setSelectedButton(null);

			setPlaceHolder('Search here');
			setAttribute('country');
		} else {
			setSelectedButton(buttonNumber);
			if (buttonNumber == 1) {
				setPlaceHolder('Search here by Country');
				setAttribute('country');
			} else if (buttonNumber == 2) {
				setPlaceHolder('Search here by Type');
				setAttribute('Type');
			}
		}
	};
	// const filteredListings = residentListings.filter((listing) =>
	// 	listing.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
	// );
	const filteredListingsCountry = debouncedSearchTerm
		? travelerListings.filter((listing) =>
				listing.country.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
		  )
		: [];
		//for now it is search by country until the backend add the type
	const filteredListingsType = debouncedSearchTerm
		? travelerListings.filter((listing) =>
				listing.country
					.toLowerCase()
					.includes(debouncedSearchTerm.toLowerCase()),
		  )
		: [];

	if (isLoading) {
		return <LoadingIcon />;
	}
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View>
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
						<Text style={styles.buttonText}>Country</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[
							styles.button,
							selectedButton === 2 && styles.selectedButton,
						]}
						onPress={() => handlePress(2)}
					>
						<Text style={styles.buttonText}>Type</Text>
					</TouchableOpacity>

					
				</View>
				{attribute==='country'&&(<FlatList
					refreshing={isFetching}
					windowSize={10}
					onRefresh={() => refetch()}
					showsVerticalScrollIndicator={false}
					data={filteredListingsCountry}
					keyExtractor={(item) => item._id}
					renderItem={({ item }) => (
						<ResidentListing
							onPress={() =>
								navigation.navigate('LocationDetails', {
									id: item._id,
									toLocation: item.residentCity,
									fromLocation: item.country,
									rating: 4,
									maxWeight: item.extraWeight,
									username: item.user.firstname + ' ' + item.user.lastname, //imageSrc: item.imageSrc,//should we remove it?
									timePosted: item.date,
									userLocation: item.residentCity,
									//prefPayment: item.prefPayment,//?
									moreD: item.description,
									//type: item.type,//??
								})
							}
							id={item._id}
							toLocation={item.residentCity}
							fromLocation={item.country}
							rating={4}
							maxWeight={item.extraWeight}
							username={item.user.firstname + ' ' + item.user.lastname}
							//imageSrc={item.imageSrc}//should we remove it?
							timePosted={item.date}
							userLocation={item.residentCity}
							//prefPayment={item.prefPayment}//?
							moreD={item.description}
							//type={item.type}//?
						/>
					)}
				/>)}
				{attribute==='Type'&&(<FlatList
					refreshing={isFetching}
					windowSize={10}
					onRefresh={() => refetch()}
					showsVerticalScrollIndicator={false}
					data={filteredListingsType}
					keyExtractor={(item) => item._id}
					renderItem={({ item }) => (
						<ResidentListing
							onPress={() =>
								navigation.navigate('LocationDetails', {
									id: item._id,
									toLocation: item.residentCity,
									fromLocation: item.country,
									rating: 4,
									maxWeight: item.extraWeight,
									username: item.user.firstname + ' ' + item.user.lastname, //imageSrc: item.imageSrc,//should we remove it?
									timePosted: item.date,
									userLocation: item.residentCity,
									//prefPayment: item.prefPayment,//?
									moreD: item.description,
									//type: item.type,//??
								})
							}
							id={item._id}
							toLocation={item.residentCity}
							fromLocation={item.country}
							rating={4}
							maxWeight={item.extraWeight}
							username={item.user.firstname + ' ' + item.user.lastname}
							//imageSrc={item.imageSrc}//should we remove it?
							timePosted={item.date}
							userLocation={item.residentCity}
							//prefPayment={item.prefPayment}//?
							moreD={item.description}
							//type={item.type}//?
						/>
					)}
				/>)}
				
			</View>
		</SafeAreaView>
	);
}

export default SearchScreenResident;

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
