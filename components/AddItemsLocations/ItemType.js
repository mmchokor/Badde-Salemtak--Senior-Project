import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import ButtonItemType from './ButtonItemType';
function ItemType(props) {
	const types = [
		'Electronics',
		'Food',
		'Clothes',
		'Medicine',
		'Accessories',
		'Others',
	];

	const [selectedOption, setSelectedOption] = useState('');
	
	const handleOptionPress = (name) => {
		setSelectedOption(name);
		props.onSelect(name);
	};
	return (
		<View
			style={{
				flexWrap: 'wrap',
				alignItems: 'center',
				flexDirection: 'row',
			}}
		>
			{types.map((option, name) => (
				<TouchableOpacity
					key={name}
					onPress={() => handleOptionPress(name)}
					style={
						selectedOption === name
							? styles.selectedOptionContainer
							: styles.optionContainer
					}
				>
					{/* <View>
						{selectedOption === name && Alert.alert(`${selectedOption}`)}
					</View> */}

					<ButtonItemType text={option} />
				</TouchableOpacity>
			))}
		</View>
	);
}
export default ItemType;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},

	selectedOptionContainer: {
		opacity: 0.4,
	},
});
