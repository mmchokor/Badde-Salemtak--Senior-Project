import { View, StyleSheet, TextInput } from 'react-native';
import { Colors } from '../../constants/colors';

function InputBorderStyle({
	keyboardType,
	maxLength,
	onChangeText,
	style,
	placeholder,
}) {
	return (
		<TextInput
			style={[styles.button, style]}
			keyboardType={keyboardType}
			maxLength={maxLength}
			onChangeText={onChangeText}
			placeholder={placeholder}
			placeholderTextColor={Colors.gray}
			//multiline={true}
			//numberOfLines={3}
		/>
	);
}
export default InputBorderStyle;

const styles = StyleSheet.create({
	button: {
		borderColor: Colors.lightGray,
		borderWidth: 1,
		borderRadius: 5,
		padding: 4,
		backgroundColor: Colors.white,
		marginVertical: 5,
		//paddingHorizontal: 10,
		fontFamily: 'inter-regular',
	},
});
