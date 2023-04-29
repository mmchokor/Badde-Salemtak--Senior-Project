import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { DUMMY_DATA_RESIDENT } from '../../constants/DUMMY_DATA';
import { useQuery } from 'react-query';
import { getTravelerListings } from '../../api/travelerListingAPI';
import ResidentListing from './ResidentListing';
import LoadingIcon from '../Loading/LoadingIcon';
const ResidentListingList = () => {
	const {
		status,
		data: travelerListings,
		isError,
		error,
		isLoading,
		refetch,
		isFetching
	} = useQuery('residentListings', getTravelerListings);

	const navigation = useNavigation();

	if (isLoading) {
		//return <Text>Loading...</Text>
		return <LoadingIcon />;
	}

	return (
		<View style={styles.wrapper}>
			{/* {console.log(travelerListings[0].user.firstname)}  */}

			<FlatList
				refreshing={isFetching}
				windowSize={10}
				onRefresh={() => refetch()}
				showsVerticalScrollIndicator={false}
				data={travelerListings}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => (
					<ResidentListing
						onPress={() =>
							navigation.navigate('LocationDetails', {
								id: item._id,
								toLocation: 'Lebanon',
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
						toLocation={'Lebanon'}
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
	);
};

export default ResidentListingList;

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		marginHorizontal: 4, //15,
		marginTop: 20
	},
});
