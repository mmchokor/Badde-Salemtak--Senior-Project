import { View, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

function BorderStyle({ children }) {
	return <View style={styles.button}>{children}</View>;
}
export default BorderStyle;

const styles = StyleSheet.create({
	button: {
		borderColor: Colors.gray,
		borderRadius: 5,
		padding: 4,
		elevation: 3,
		backgroundColor: Colors.white,
	},
});
