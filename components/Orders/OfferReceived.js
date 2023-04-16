import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	Image,
	Dimensions,
} from 'react-native';
import React from 'react';
import { Colors } from '../../constants/colors';
import { Entypo } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../UI/Button';
import OfferRecievedInfo from './OfferRecievedInfo';
import OfferReceivedPriceSummary from './OfferReceivedPriceSummary';
import { useQuery } from "react-query";
import { getToken } from "../../api/userAPI"
import { getResidentListingById } from "../../api/residentListingsAPI";
import { getOrderById} from "../../api/orderAPI"
import { formatDate } from '../../constants/FormatDate';
import { useEffect } from 'react';

const height = Dimensions.get('window').height;

const OfferReceived = ({ route, navigation }) => {
	const {
		image,
		price,
		title,
		location,
		formattedDate,
		message,
		totalPrice,
    	username,
		listingId,
		orderId,
		id
	} = route.params;



	const { data: token } = useQuery("token", getToken);
	const { data: listing, isLoading: isListingLoading, isError, refetch: refetchResident, isFetching: isFetchingResident } = useQuery(
		"listing", () =>
		getResidentListingById(token, listingId),
		{ enabled: !!token, staleTime: 1 }
	  );

	  const {data: order, isLoading: isOrderLoading, refetch: refetchOrder, isFetching: isFetchingOrder} = useQuery("order", () => getOrderById(orderId), {staleTime: 1})


		useEffect(() => {
			refetchResident()
			refetchOrder()
		}, [id])


	  if (isFetchingResident || isFetchingOrder) {
		return (
		  <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
			<Text>Loading</Text>
		  </View>
		);
	  }
	
	  if (isError) {
		return <Text>Error Loading</Text>;
	  }



	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<View style={styles.wrapper}>
				<Image
					style={styles.image}
					//replace with image here
					//source={image}
					source={{ uri: listing.images[0] }}
				/>
				<View style={styles.header}>
					<View style={styles.linkContainer}>
						<Text style={{ width: '95%' }}>
							<Text style={styles.link}>Link to your item: </Text>
							<Text style={styles.linkText}>
								{/* Apple-MacBook-13-inch-Display-Dual-cores */}
								{listing.name}
							</Text>
						</Text>
						<Entypo name='link' size={16} color='black' />
					</View>
					<View style={styles.linkContainer}>
						<Text style={{ width: '95%' }}>
							<Text style={styles.link}>Address: </Text>
							<Text style={styles.linkText}>{listing.cityOfResidence}</Text>
						</Text>
						<Entypo name='location' size={16} color='black' />
					</View>
					<View
						style={{
							borderBottomColor: 'black',
							borderBottomWidth: StyleSheet.hairlineWidth,
							opacity: 0.3,
						}}
					/>

					<Text style={styles.headerTwo}>Offer Received</Text>
					<OfferRecievedInfo extraFees={order.deliveryFee - 5} date={formatDate(order.date)} message={order.message} />
					<OfferReceivedPriceSummary
						travelerReward={10}
						subTotal={listing.price}
						deliveryFee={order.deliveryFee}
						totalPrice={listing.price + order.deliveryFee + 10 + 5}
					/>

					<View style={styles.buttonWrapper}>
						<Button
							textStyle={{ fontSize: 14 }}
							styleWrapper={styles.buttonWrapper}
							style={styles.button}
							onPress={() => {
								navigation.navigate('ProceedToPayment', {
									price:price,
									title:title,
									totalPrice:totalPrice,
                  username:username,
								});
							}}
						>
							Proceed To Payment
						</Button>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

export default OfferReceived;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		//backgroundColor: '#EDEEF1',
	},
	wrapper: {
		//marginTop: height < 800 ? 80 : 100,
		marginHorizontal: 10,
	},
	image: {
		alignSelf: 'center',
		height: 150,
		width: 150,
	},
	header: {
		marginTop: 5,
	},
	linkContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 15,
		//flexWrap: "wrap",
	},
	link: {
		fontFamily: 'inter-bold',
		fontSize: 14,
	},
	linkText: {
		fontFamily: 'inter-light',
		fontSize: 12,
		opacity: '20%',
	},
	headerTwo: {
		fontFamily: 'inter-bold',
		fontSize: 16,
		textAlign: 'center',
		marginTop: 20,
	},

	totalContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	totalHeader: {
		color: '#C8C8C8',
	},
	totalPrice: {
		fontFamily: 'inter-medium',
	},
	buttonWrapper: {
		marginVertical: 20,
	},
	button: {
		width: '70%',
	},
	buttonWrapper: {
		borderRadius: 12,
	},
});
