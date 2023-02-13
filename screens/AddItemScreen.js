import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import { Colors } from "../constants/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import BorderStyle from "../components/AddItemsLocations/BorderStyle";
import ItemType from "../components/AddItemsLocations/ItemType";
import InputBorderStyle from "../components/AddItemsLocations/InputBorderStyle";
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
				<View style={{ flex: 1, paddingHorizontal: 30, marginBottom: 80 }}>
					<Text style={styles.textHead}>Item Name*</Text>
					<TextInput placeholder='iphone 13 pro max' style={styles.inputT} />
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
							placeholder='918'
							style={[styles.inputT, { marginLeft: 10, width: 50 }]}
							keyboardType='number-pad'
							maxLength={5}
						/>
					</View>
					{/* Quantity and Weight View */}
					<View style={{ flexDirection: "row" }}>
						<View>
							<Text style={styles.textHead}>Quantity</Text>
							<View>{/* The adder *1 up or down */}</View>
						</View>
						<View>
							<Text style={styles.textHead}>Weight</Text>
							<View style={{ flexDirection: "row", alignItems: "center" }}>
								<BorderStyle>
									<View style={{ flexDirection: "row", alignItems: "center" }}>
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
									placeholder='0.5'
									style={[styles.inputT, { marginLeft: 10, width: 50 }]}
									keyboardType='number-pad'
									maxLength={5}
								/>
							</View>
						</View>
					</View>

					{/* Type */}
					<View>
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
								<InputBorderStyle keyboardType="number-pad" maxLength={4}/>
							</View>
						</View>
						<Text style={styles.textL}>Additional Description</Text>
						<InputBorderStyle />
						<Text style={styles.textHead}>Preferred Payment Method</Text>
						<View></View>
					</View>
				</View>
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
		justifyContent: "space-evenly",
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
