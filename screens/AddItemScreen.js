import { StyleSheet, Text, TextInput, View,Pressable } from "react-native";
import { Colors } from "../constants/colors";

function AddItemScreen({ navigation }) {
	function PressEventHandler() {
		navigation.navigate("Location");
	}
	return (
		<View style={{ alignItems: "center" }}>
			<View style={styles.upperButton}>
				<View style={styles.traveler}>
					<Text style={styles.textT}>Add Item</Text>
				</View>
				<Pressable onPress={PressEventHandler}>
					<View style={styles.resident}>
						<Text style={styles.textR}>Add Location</Text>
					</View>
				</Pressable>
			</View>
			<Text>ItemScreen</Text>
		</View>
	);
}

export default AddItemScreen;

const styles = StyleSheet.create({
	upperButton: {
		margin: 5,
		width: 200,
		height: 45,
		backgroundColor: Colors.darkGreen,
		borderRadius: 30,
		alignItems: "center",
		alignContent: "center",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	traveler: {
		backgroundColor: Colors.white,
		padding: 5,
		marginLeft: 7,
		color: Colors.white,
		borderRadius: 30,
	},
	resident: {
		padding: 5,
		borderRadius: 30,
		marginRight: 7,
		borderRadius: 30,
	},
	textT: {
		fontFamily: "inter-regular",
		color: Colors.black,
	},
	textR: {
		color: Colors.white,
		fontFamily: "inter-regular",
	},
});
