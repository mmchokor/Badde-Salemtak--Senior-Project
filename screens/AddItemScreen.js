import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import { Colors } from "../constants/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
function AddItemScreen({ navigation }) {
	function PressEventHandler() {
		navigation.navigate("Location");
	}
	return (
		<View style={{ alignItems: "center" }}>
			<View style={styles.upperButton}>
				<View style={styles.item}>
					<Text style={styles.textI}>Add Item</Text>
				</View>
				<Pressable onPress={PressEventHandler}>
					<View style={styles.location}>
						<Text style={styles.textL}>Add Location</Text>
					</View>
				</Pressable>
			</View>
			<ScrollView>
				<View>
					<Text>Item Name*</Text>
					<TextInput placeholder='iphone 13 pro max' />
					<Text>Price</Text>

					{/* Price View */}
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<View>
							<Text>USD</Text>
						</View>

						<TextInput placeholder='918' />
					</View>
					{/* Quantity and Weight View */}
					<View style={{ flexDirection: "row" }}>
						<View>
							<Text>Quantity</Text>
							<View>{/* The adder *1 up or down */}</View>
						</View>
						<View>
							<Text>Weight</Text>
							<View style={{ flexDirection: "row", alignItems: "center" }}>
								<View style={{ flexDirection: "row", alignItems: "center" }}>
									<FontAwesome5 name='weight-hanging' size={20} />
									<Text>Kg</Text>
								</View>
								<TextInput placeholder='0.5' />
							</View>
						</View>
					</View>

					{/* Type */}
					<View>
						<Text>Type</Text>
						<View
							style={{
								flexWrap: "wrap",
								alignItems: "center",
								justifyContent: "space-between",
								flexDirection: "row",
							}}
						>
							<View
								style={{
									width: 20,
									height: 20,
									backgroundColor: Colors.black,
									margin: 10,
								}}
							></View>
						</View>
					</View>

					{/* More Details,Location */}
					<View>
						<Text>More Details</Text>
						<TextInput placeholder='more details' style={{ borderWidth: 1 }} />
						<Text>Location</Text>
						<Text>Address*</Text>
						<TextInput placeholder='address' style={{ borderWidth: 1 }} />
						<Text>Street Name*</Text>
						<TextInput placeholder='street name' style={{ borderWidth: 1 }} />
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<View>
								<Text>Building*</Text>
								<TextInput placeholder='building' style={{ borderWidth: 1 }} />
							</View>
							<View>
								<Text>Floor</Text>
								<TextInput placeholder='floor' style={{ borderWidth: 1 }} />
							</View>
						</View>
						<Text>Additional Description</Text>
						<TextInput
							placeholder='additional description'
							style={{ borderWidth: 1 }}
						/>
						<Text>Preferred Payment Method</Text>
						<View>
							
						</View>
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
	textL: {
		color: Colors.white,
		fontFamily: "inter-regular",
	},
});
