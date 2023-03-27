import { useState } from 'react';
import { Text, StyleSheet, View, Dimensions, TextInput } from 'react-native';
import PreferredPaymentOrder from '../components/Orders/PreferredPaymentOrder';
import Button from '../components/UI/Button';
import { Colors } from '../constants/colors';
import { useAtom } from 'jotai';
import { paymentM } from '../store/PaymentOrder/paymentOrder';
const height = Dimensions.get('window').height;
function ProceedToPayment({ route ,navigation}) {
	const { price, title, totalPrice, username } = route.params;
	const [payment, setPayment] = useAtom(paymentM);

	function screenPay(payment) {
		if (payment === 0) {
			return (
				<View>
					<Text style={styles.title}>Cash on Delivery</Text>
					<Text style={[styles.title, { color: Colors.darkGreen }]}>
						Using cash on delivery we bare no responsibility for the item or the
						money
					</Text>
				</View>
			);
		} else if (payment === 3) {
			return (
				<View>
					<Text style={styles.title}>Whish Money</Text>
					<Text style={styles.subtitle}>Send to:{username}</Text>
					<Text style={styles.subtitle}>Phone number:{username}</Text>
				</View>
			);
		} else if (payment === 2) {
			return (
				<View>
					<Text style={styles.title}>Via/Mastercard</Text>
					<Text style={styles.subtitle}>Name on Card</Text>
					<View style={styles.inputWrapper}>
						<TextInput
							style={[styles.input, { paddingLeft: 10 }]}
							placeholder='Karam Timani'
						></TextInput>
					</View>
					<Text style={styles.subtitle}>Card Number</Text>
					<View style={styles.inputWrapper}>
						<TextInput
							style={[styles.input, { paddingLeft: 10 }]}
							placeholder='**** **** **** ****'
						></TextInput>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<View>
							<Text style={styles.subtitle}>Expiration date</Text>
							<View style={styles.inputWrapper}>
								<TextInput
									style={[
										styles.input,
										{ paddingRight: 110, marginRight: 55, paddingLeft: 10 },
									]}
									placeholder='MM/YY'
								></TextInput>
							</View>
						</View>
						<View>
							<Text style={styles.subtitle}>Security Code</Text>
							<View style={styles.inputWrapper}>
								<TextInput
									style={[styles.input, { paddingRight: 100, paddingLeft: 10 }]}
									placeholder='CVC'
								></TextInput>
							</View>
						</View>
					</View>
				</View>
			);
		} else if (payment === 1) {
			return (
				<View>
					<Text style={styles.title}>Western Union</Text>
					<Text style={styles.subtitle}>Send to:{username}</Text>
					<Text style={styles.subtitle}>Phone number:{username}</Text>
					<Text style={[styles.subhead, { marginTop: 20 }]}>
						Note: The money will be held in escrow with us until you confirm
						that you have received the item
					</Text>
				</View>
			);
		} else {
			return (
				<Text style={[styles.title, { marginVertical: 50, marginTop: 50 }]}>
					Please Select a Payment Method
				</Text>
			);
		}
	}
	return (
		<View style={styles.body}>
			<Text style={styles.head}>Please choose a payment method:</Text>
			<Text style={styles.subhead}>
				Note: The money will be held in escrow with us until you confirm that
				you have received the item
			</Text>
			<View>
				<PreferredPaymentOrder />
			</View>
			<View>{screenPay(payment)}</View>
			<View style={styles.buttonWrapper}>
				<Button
					textStyle={{ fontSize: 14 }}
					styleWrapper={styles.buttonWrapper}
					style={styles.button}
					onPress={() => {
						navigation.navigate('OrderConfirmation', {
							price: price,
							title: title,
							totalPrice: totalPrice,
							username: username,
						});
					}}
				>
					Confirm Payment
				</Button>
			</View>
		</View>
	);
}

export default ProceedToPayment;

const styles = StyleSheet.create({
	body: {
		paddingHorizontal: 10,
		flex: 1,
		backgroundColor: 'white',
	},
	head: {
		fontFamily: 'inter-bold',
		fontSize: 15,
		marginTop: 15,
		color: Colors.black,
	},
	subhead: {
		fontFamily: 'inter-light',
		fontSize: 13,
		marginTop: 2,
		opacity: 0.9,
		color: Colors.darkGreen,
	},
	title: {
		fontFamily: 'inter-bold',
		fontSize: 20,
		marginTop: 10,
		color: Colors.black,
		textAlign: 'center',
	},
	subtitle: {
		fontFamily: 'inter-bold',
		fontSize: 15,
		marginTop: 10,
		color: Colors.black,
	},
	buttonWrapper: {
		marginVertical: 10,
		borderRadius: 12,
	},
	button: {
		width: '80%',
	},
	input: {
		backgroundColor: Colors.inputGray,
		borderRadius: 8,
		padding: height < 800 ? 4 : 6,
		marginTop: 10,
	},
});
