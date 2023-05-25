import { useState } from 'react';
import { Text, StyleSheet, View, Dimensions, TextInput } from 'react-native';
import Button from '../components/UI/Button';
import { Colors } from '../constants/colors';
const height = Dimensions.get('window').height;
import { Ionicons } from '@expo/vector-icons';
import StraightLine from '../components/UI/StraightLine';

function OrderConfirmation({ route, navigation }) {
	const { price, title, totalPrice, username, deliveryFee } = route.params;


	return (
		<View style={styles.body}>
			<View style={styles.icon}>
				<Ionicons name='checkmark-circle' size={60} color='#31af91' />
			</View>
			<View style={{ paddingBottom: 30 }}>
				<Text style={styles.head}>
					Hey <Text style={{ color: '#31af91' }}> {username}</Text>,{'\n'} Money
					has been transferred
				</Text>
			</View>

			<StraightLine />
			<View style={{ paddingVertical: 30 }}>
				<View style={styles.summaryContainer}>
					<Text style={styles.summaryHeader}>Item Price:</Text>
					<Text style={styles.summaryPrice}>${price}</Text>
				</View>
				<View style={styles.summaryContainer}>
					<Text style={styles.summaryHeader}>Service fee:</Text>
					<Text style={styles.summaryPrice}>$5</Text>
				</View>
				<View style={styles.summaryContainer}>
					<Text style={styles.summaryHeader}>Traveler reward:</Text>
					<Text style={styles.summaryPrice}>$10</Text>
				</View>
				<View style={styles.summaryContainer}>
					<Text style={styles.summaryHeader}>Delivery Fee:</Text>
					<Text style={styles.summaryPrice}>${deliveryFee}</Text>
				</View>
			</View>
			<StraightLine />
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<Text style={styles.total}>Total:</Text>
				<Text style={[styles.total, { color: '#31af91'}]}>
					${totalPrice}
				</Text>
			</View>
			<Button
				onPress={() => {
					navigation.navigate('TravelerorResident', {
						price: price,
						title: title,
						totalPrice: totalPrice,
						username: username,
					});
				}}
			>
				Order Details
			</Button>
		</View>
	);
}

export default OrderConfirmation;

const styles = StyleSheet.create({
	body: {
		paddingHorizontal: 10,
		flex: 1,
		backgroundColor: 'white',
	},
	icon: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 80,
	},
	head: {
		fontFamily: 'inter-bold',
		fontSize: 20,
		textAlign: 'center',
		marginTop: 50,
	},
	line: {
		borderColor: Colors.gray,
		borderWidth: 0.5,
		marginTop: 20,
	},
	total: {
		fontFamily: 'inter-bold',
		fontSize: 18,

		marginTop: 10,
	},
	summaryHeader: {
		color: '#C8C8C8',
		fontFamily: 'inter-bold',
	},
	summaryPrice: {
		fontFamily: 'inter-medium',
	},

	summaryContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
});
