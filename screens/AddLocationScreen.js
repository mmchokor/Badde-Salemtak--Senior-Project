import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Pressable,
	KeyboardAvoidingView,
} from "react-native";
import { Colors } from "../constants/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import BorderStyle from "../components/AddItemsLocations/BorderStyle";
import ItemType from "../components/AddItemsLocations/ItemType";
import InputBorderStyle from "../components/AddItemsLocations/InputBorderStyle";
import PreferredPayment from "../components/AddItemsLocations/PreferredPayment";

function AddLocationScreen({ navigation }) {
	function PressEventHandler() {
		navigation.navigate("Item");
	}
	return (
		<View style={{ alignItems: "center",backgroundColor:Colors.white }}>
			<View style={styles.upperButton}>
				<Pressable onPress={PressEventHandler}>
					<View style={styles.item}>
						<Text style={styles.texI}>Add Item</Text>
					</View>
				</Pressable>
				<View style={styles.location}>
					<Text style={styles.textLocation}>Add Location</Text>
				</View>
			</View>

			<ScrollView>
				<KeyboardAvoidingView
					behavior='padding'
					enabled
					style={{ height: 720 }}
				>
					<View style={{ paddingHorizontal: 20 }}>
						<Text style={styles.textHead}>Country Name From*</Text>
						<TextInput style={styles.inputT} />
						<Text style={styles.textHead}>Country Name From*</Text>
						<TextInput style={styles.inputT} />

						{/* Weight View */}

						<View style={{ marginRight: 70 }}>
							<View>
								<Text style={styles.textHead}>Preferred Weight</Text>
								<View style={{ flexDirection: "row", alignItems: "center" }}>
									<BorderStyle>
										<View
											style={{ flexDirection: "row", alignItems: "center" }}
										>
											<FontAwesome5 name='weight-hanging' size={15} />
											<Text
												style={{
													fontSize: 12,
													opacity: 0.7,
													fontFamily: "inter-light",
												}}
											>
												Kg
											</Text>
										</View>
									</BorderStyle>
									<TextInput
										style={[styles.inputT, { marginLeft: 10, width: 50 }]}
										keyboardType='number-pad'
										maxLength={5}
									/>
								</View>
							</View>
						</View>

						{/* Type */}
						<View style={{ marginTop: 2 }}>
							<Text style={[styles.textHead, { marginBottom: 6 }]}>
								Preferred Type
							</Text>
							<ItemType />
						</View>

						{/* More Details,Location */}
						<View>
							<Text style={styles.textHead}>More Details</Text>
							<InputBorderStyle />
							<Text style={styles.textHead}>Location</Text>
							<Text style={styles.textL}>Address*</Text>
							<InputBorderStyle />
						</View>

						<Text style={styles.textHead}>Preferred Payment Method</Text>

						<View>
							<PreferredPayment />
						</View>
					</View>
				</KeyboardAvoidingView>
			</ScrollView>
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
	textLocation: {
		color: Colors.black,
		fontFamily: "inter-regular",
	},
	textHead: {
		color: Colors.darkGreen,
		fontSize: 18,
		fontFamily: "inter-regular",
		marginTop: 10,
	},
	inputT: {
		fontFamily: "inter-regular",
		color: Colors.black,
		fontSize: 16,
		borderBottomWidth: 0.5,
		borderBottomColor: Colors.gray,
	},
	textL: {
		color: Colors.darkGreen,
		fontFamily: "inter-light",
	},
});
