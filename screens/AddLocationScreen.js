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
					<View style={styles.item}>
						<Text style={styles.texI}>Add Item</Text>
					</View>
				</Pressable>
				<View style={styles.location}>
					<Text style={styles.textL}>Add Location</Text>
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
		width: 190,
		height: 45,
		backgroundColor: Colors.darkGreen,
		borderRadius: 30,
		alignItems: "center",
		alignContent: "center",
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
	item: {
		padding: 5,
		borderRadius: 30,
		marginLeft: 7,
		color: Colors.white,
	},
	location: {
		backgroundColor: Colors.white,
		padding: 7,
		borderRadius: 30,
		marginRight: 7,
	},
	texI: {
		fontFamily: "inter-regular",
		color: Colors.white,
	},
	textL: {
		color: Colors.black,
		fontFamily: "inter-regular",
	},
});
