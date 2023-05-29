import { View, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

function BorderStyle({ children,style}) {
	return <View style={[styles.button,style]}>{children}</View>;
}
export default BorderStyle;

const styles = StyleSheet.create({
	button: {
		borderColor: '#e3e4e7',
		//borderColor: 'white',
		borderRadius: 5,
		padding: 4,
		elevation: 1,
		backgroundColor: Colors.white,
		borderWidth: 1,
		
	},
});
