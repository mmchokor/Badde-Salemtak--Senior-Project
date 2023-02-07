import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "../../constants/colors";
function AddUpperBar({ onPress, traveler, textT, resident, textR }) {
	return (
		<View style={styles.upperButton}>
			<View style={traveler}>
				<Text style={textT}>Add Item</Text>
			</View>
			<Pressable onPress={onPress}>
				<View style={resident}>
					<Text style={textR}>Add Location</Text>
				</View>
			</Pressable>
		</View>
	);
}
export default AddUpperBar;

const styles = StyleSheet.create({
	upperButton: {
		margin: 5,
		width: 190,
		height: 60,
		backgroundColor: Colors.darkGreen,
		borderRadius: 30,
		alignItems: "center",
		alignContent: "center",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	
});
