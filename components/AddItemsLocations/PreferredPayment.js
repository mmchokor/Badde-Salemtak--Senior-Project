import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/colors';
import { useEffect, useState } from 'react';

function PreferredPayment(props) {
	const types = [
		{
			uri: require('../../assets/PaymentsLogos/cash-on-delivery-steacker-free-vector.webp'),
		},
		{
			uri: require('../../assets/PaymentsLogos/Western-Union-Logo-768x432.png'),
		},
		{ uri: require('../../assets/PaymentsLogos/Artboard10.jpg') },
	];
	const [selectedOption, setSelectedOption] = useState(props.selectedOption);


	
	function handleOptionSelect(name) {
		setSelectedOption(name);
		props.onSelectOption(name);
	}

	

	


	//props.onReset()
	return (
		<View style={[styles.container, props.style]}>
			{types.map((option, name) => (
				<TouchableOpacity
					key={name}
					onPress={() => handleOptionSelect(name)}
					style={
						selectedOption === name
							? styles.selectedOptionContainer
							: styles.optionContainer
					}
				>
					<Image source={option.uri} style={{ width: 80, height: 40 }} />
				</TouchableOpacity>
			))}
		</View>
	);
}
export default PreferredPayment;

const styles = StyleSheet.create({
	container: {
		marginTop: 5,
		borderColor: Colors.gray,
		borderRadius: 5,
		padding: 10,
		elevation: 3,
		backgroundColor: Colors.white,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		
	},
	selectedOptionContainer: {
		opacity: 0.4,
		borderWidth: 2,
		borderColor: Colors.darkGreen,
		padding: 4,
		borderRadius: 10,
	},
});
