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

const height = Dimensions.get('window').height;

const OfferReceived = ({ route, navigation }) => {
	//const username = route.params.username;
	const image = route.params.image;
	const price = route.params.price;
	const title = route.params.title;
	const location = route.params.location;
	function confirmPayNav() {
		navigation.navigate('ProceedToPayment', {});
	}
	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<View style={styles.wrapper}>
				<Image
					style={styles.image}
					source={require('../../assets/ItemImages/laptop.png')}
					//replace with image here
					//source={image}
				/>
				<View style={styles.header}>
					<View style={styles.linkContainer}>
						<Text style={{ width: '95%' }}>
							<Text style={styles.link}>Link to your item: </Text>
							<Text style={styles.linkText}>
								{/* Apple-MacBook-13-inch-Display-Dual-cores */}
								{title}
							</Text>
						</Text>
						<Entypo name='link' size={16} color='black' />
					</View>
					<View style={styles.linkContainer}>
						<Text style={{ width: '95%' }}>
							<Text style={styles.link}>Address: </Text>
							<Text style={styles.linkText}>{location}</Text>
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
					<OfferRecievedInfo />
					<OfferReceivedPriceSummary
						travelerReward={10}
						subTotal={price}
						deliveryFee={20}
					/>

					<View style={styles.buttonWrapper}>
						<Button
							textStyle={{ fontSize: 14 }}
							styleWrapper={styles.buttonWrapper}
							style={styles.button}
							onPress={confirmPayNav}
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
