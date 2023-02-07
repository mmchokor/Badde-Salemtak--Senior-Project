import { StyleSheet, Text, TextInput, View,Pressable } from "react-native";

import { Colors } from "../constants/colors";

function AddLocationScreen({ navigation }) {
	function PressEventHandler() {
		navigation.navigate("Item");
	}
	return (
		<View style={{ alignItems: "center" }}>
			<View style={styles.upperButton}>
				<Pressable onPress={PressEventHandler}>
					<View style={styles.traveler}>
						<Text style={styles.textT}>Add Item</Text>
					</View>
				</Pressable>
				<View style={styles.resident}>
					<Text style={styles.textR}>Add Location</Text>
				</View>
			</View>
			<Text>Location Screen</Text>
		</View>
	);
}

export default AddLocationScreen;

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
		padding: 5,
		borderRadius: 30,
		marginLeft: 7,
		color: Colors.white,
	},
	resident: {
		backgroundColor: Colors.white,
		padding: 5,
		borderRadius: 30,
		marginRight: 7,
	},
	textT: {
		fontFamily: "inter-regular",
		color: Colors.white,
	},
	textR: {
		color: Colors.black,
		fontFamily: "inter-regular",
	},
});
