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
import QuantityButton from "../components/AddItemsLocations/QuantityButton";
function AddItemScreen({ navigation }) {
	function PressEventHandler() {
		navigation.navigate("Location");
	}
	return (
		<View style={{ backgroundColor: Colors.white }}>
			<View style={{ alignItems: "center" }}>
				<View style={styles.upperButton}>
					<View style={styles.item}>
						<Text style={styles.textI}>Add Item</Text>
					</View>
					<Pressable onPress={PressEventHandler}>
						<View style={styles.location}>
							<Text style={styles.textLocation}>Add Location</Text>
						</View>
					</Pressable>
				</View>
			</View>

			<ScrollView>
				<KeyboardAvoidingView
					behavior='padding'
					enabled
					style={{ height: 830 }}
				>
					<View style={{ paddingHorizontal: 20 }}>
						<Text style={styles.textHead}>Item Name*</Text>
						<TextInput style={styles.inputT} />
						<Text style={styles.textHead}>Price</Text>

						{/* Price View */}
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<BorderStyle>
								<Text
									style={{
										fontSize: 12,
										opacity: 0.7,
										fontFamily: "inter-light",
									}}
								>
									USD
								</Text>
							</BorderStyle>

							<TextInput
								style={[styles.inputT, { marginLeft: 10, width: 50 }]}
								keyboardType='number-pad'
								maxLength={5}
							/>
						</View>
						{/* Quantity and Weight View */}
						<View style={{ flexDirection: "row", marginTop: 2 }}>
							<View style={{ marginRight: 70 }}>
								<Text style={styles.textHead}>Quantity</Text>
								<View>
									<QuantityButton />
								</View>
							</View>
							<View>
								<Text style={styles.textHead}>Weight</Text>
								<View style={{ flexDirection: "row", alignItems: "center" }}>
									<BorderStyle>
										<View
											style={{ flexDirection: "row", alignItems: "center" }}
										>
											<FontAwesome5 name='weight-hanging' size={14} />
											<Text
												style={{
													fontSize: 14,
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
							<Text style={[styles.textHead, { marginBottom: 6 }]}>Type</Text>
							<ItemType />
						</View>

						{/* More Details,Location */}
						<View>
							<Text style={styles.textHead}>More Details</Text>
							<InputBorderStyle />
							<Text style={styles.textHead}>Location</Text>
							<Text style={styles.textL}>Address*</Text>
							<InputBorderStyle />
							<Text style={styles.textL}>Street Name*</Text>
							<InputBorderStyle />
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
								}}
							>
								<View>
									<Text style={[styles.textL, { width: 250 }]}>Building*</Text>
									<InputBorderStyle />
								</View>
								<View style={{}}>
									<Text style={[styles.textL, { width: 60 }]}>Floor</Text>
									<InputBorderStyle keyboardType='number-pad' maxLength={4} />
								</View>
							</View>
							<Text style={styles.textL}>Additional Description</Text>
							<InputBorderStyle />
							<Text style={styles.textHead}>Preferred Payment Method</Text>
						</View>
						<View style={{ marginBottom: 80 }}>
						
							<PreferredPayment/>
						</View>
					</View>
				</KeyboardAvoidingView>
			</ScrollView>
		</View>
	);
}

export default AddItemScreen;

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
		justifyContent: "space-between",
	},
	item: {
		backgroundColor: Colors.white,
		padding: 7,
		marginLeft: 7,
		color: Colors.white,
		borderRadius: 30,
	},
	location: {
		padding: 5,
		borderRadius: 30,
		marginRight: 7,
		borderRadius: 30,
	},
	textI: {
		fontFamily: "inter-regular",
		color: Colors.black,
	},
	textLocation: {
		color: Colors.white,
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
