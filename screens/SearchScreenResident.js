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
	const [placeHolder, setPlaceHolder] = useState('Search Item');
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

			setPlaceHolder('Search Country');
			setAttribute('country');
		} else {
			setSelectedButton(buttonNumber);
			if (buttonNumber == 1) {
				setPlaceHolder('Search Item by Country');
				setAttribute('country');
			} else if (buttonNumber == 2) {
				setPlaceHolder('Search Item by Location');
				setAttribute('Location');
			} else if (buttonNumber == 3) {
				setPlaceHolder('Search Item by Type');
				setAttribute('countryr');
			}
		}
	};
	// const filteredListings = residentListings.filter((listing) =>
	// 	listing.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
	// );
	const filteredListings = debouncedSearchTerm
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
					placeholder='Search Country'
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
				/>
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
});
