import { View, StyleSheet,TextInput } from "react-native";
import { Colors } from "../../constants/colors";

function InputBorderStyle({keyboardType,maxLength}) {
	return <TextInput style={styles.button} keyboardType={keyboardType} maxLength={maxLength}/>;
}
export default InputBorderStyle;

const styles = StyleSheet.create({
	button: {
		borderColor: Colors.gray,
		borderRadius: 5,
		padding: 4,
		elevation: 3,
		backgroundColor: Colors.white,
		
	},
});