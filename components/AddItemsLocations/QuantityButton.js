import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import BorderStyle from './BorderStyle';
import { Colors } from '../../constants/colors';
function QuantityButton(props) {
	const [number, setNumber] = useState(0);

	const incrementNumber = () => {
		const newNumber = number + 1;
		setNumber(newNumber);
		props.onUpdateQuantity(newNumber);
	};

	const decrementNumber = () => {
		const newNumber = number - 1;
		setNumber(newNumber < 0 ? 0 : newNumber);
		props.onUpdateQuantity(newNumber < 0 ? 0 : newNumber);
	};

	return (
		<BorderStyle>
			<View style={styles.container}>
				<AntDesign
					name='caretdown'
					onPress={decrementNumber}
					size={15}
					color={Colors.black}
				/>
				<Text style={styles.number}>x{number}</Text>
				<AntDesign
					name='caretup'
					onPress={incrementNumber}
					size={15}
					color={Colors.black}
				/>
			</View>
		</BorderStyle>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	number: {
		fontSize: 15,
		fontFamily: 'inter-regular',
		color: Colors.black,
	},
});

export default QuantityButton;
