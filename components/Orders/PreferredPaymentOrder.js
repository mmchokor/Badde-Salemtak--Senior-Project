import {
	View,
	StyleSheet,
	Text,
	Image,
	TouchableOpacity,
	Pressable,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { useState } from 'react';
import { useAtom } from "jotai";
import { paymentM } from '../../store/PaymentOrder/paymentOrder';

function PreferredPaymentOrder() {
	const [payment,setPayment]=useAtom(paymentM);
	const types = [
		{
			uri: require('../../assets/PaymentsLogos/cash-on-delivery-steacker-free-vector.webp'),
		},
		{
			uri: require('../../assets/PaymentsLogos/Western-Union-Logo-768x432.png'),
		},
		{ uri: require('../../assets/PaymentsLogos/Artboard10.jpg') },
		{ uri: require('../../assets/PaymentsLogos/whish.png') },
	];
	const [selectedOption, setSelectedOption] = useState(null);

	return (
		<View>
			<View style={styles.container}>
				{types.map((option, index) => (
					<Pressable
						key={index}
						onPress={() => {
							setSelectedOption(index);
							setPayment(index);
						
						}}
						style={[selectedOption === index && styles.selectedOptionContainer]}
					>
						<View style={styles.border}>
							<Image source={option.uri} style={{ width: 100, height: 50 }} />
						</View>
					</Pressable>
				))}
			</View>
		</View>
	);
}

export default PreferredPaymentOrder;

const styles = StyleSheet.create({
	container: {
		marginTop: 5,
		paddingVertical: 10,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: Colors.white,
		flexWrap: 'wrap',
	},
	selectedOptionContainer: {
		borderWidth: 1,
		borderColor: Colors.darkGreen,
		borderRadius: 10,
		backgroundColor: Colors.white,
	},
	border: {
		borderRadius: 10,
		elevation: 3,
		backgroundColor: Colors.white,
		padding: 10,
		height: 80,
		width: 120,
		justifyContent: 'center',
		marginHorizontal: 5, // add margin between payment options
		marginVertical: 5,
	},
});
