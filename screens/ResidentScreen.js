import { StyleSheet, Text, View, Pressable } from "react-native";
import { Colors } from "../constants/colors";
function ResidentScreen({ navigation }) {
	function PressEventHandler() {
		navigation.navigate("Traveler");
	}
	return (
		<View style={{ alignItems: "center" }}>
			<View style={{ }}>
				<View style={styles.upperButton}>
					<Pressable onPress={PressEventHandler}>
						<View style={styles.traveler}>
							<Text style={styles.textT}>Traveler</Text>
						</View>
					</Pressable>
					<View style={styles.resident}>
						<Text style={styles.textR}>Resident</Text>
					</View>
				</View>
			</View>
			<Text>ResidentScreen</Text>
		</View>
	);
}
export default ResidentScreen;

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
	traveler: {
		padding: 15,
		borderRadius: 30,
		marginLeft: 7,
		color: Colors.white,
	},
	resident: {
		backgroundColor: Colors.white,
		padding: 15,
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
