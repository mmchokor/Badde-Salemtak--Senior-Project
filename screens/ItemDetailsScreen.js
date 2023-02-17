import {
	View,
	Text,
	StyleSheet,
	KeyboardAvoidingView,
	Image,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Colors } from "../constants/colors";
import ButtonItemType from "../components/AddItemsLocations/ButtonItemType";
import BorderStyle from "../components/AddItemsLocations/BorderStyle";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";

import MyText from "../components/UI/MyText";
function ItemDetailsScreen({ route }) {
	return (
		<View>
			{/* <Text>Item Details Screen:{route.params.id}  {route.params.title}</Text> */}

			<ScrollView>
				<KeyboardAvoidingView behavior='padding'>
					<View style={styles.container}>
						<View style={{ paddingBottom: 12, paddingHorizontal: 10 }}>
							<View
								style={{
									flexDirection: "row",
								}}
							>
								<View
									style={{ flexDirection: "column", alignItems: "flex-start" }}
								>
									<Image
										source={route.params.imageSrc}
										style={styles.itemPhoto}
									/>
									<View style={{ marginTop: 10 }}>
										<ButtonItemType text={route.params.type} />
									</View>
								</View>
								<View>
									{/* Title */}
									<MyText style={styles.textTitle}>{route.params.title}</MyText>
									{/* Price */}
									<Text style={styles.priceText}>USD {route.params.price}</Text>

									{/* Quantity */}
									<View
										style={{
											flexDirection: "row",
											marginTop: 8,
											alignItems: "center",
										}}
									>
										<Text style={styles.qTwText}>Quantity </Text>
										<View>
											<BorderStyle>
												<Text
													style={{
														fontSize: 14,
														opacity: 0.7,
														fontFamily: "inter-light",
														marginRight: 3,
													}}
												>
													x {route.params.quantity}
												</Text>
											</BorderStyle>
										</View>
									</View>

									{/* Type and Weight */}
									<View style={{ marginTop: 8 }}>
										{/* Type */}
										{/* <View style={{ alignItems: "center" }}>
											<Text style={styles.qTwText}>Type</Text>

											<ButtonItemType text={route.params.type} />
										</View> */}

										{/* Weight */}
										<View
											style={{ alignItems: "center", flexDirection: "row" }}
										>
											<Text style={[styles.qTwText, { marginRight: 14 }]}>
												Weight
											</Text>
											<BorderStyle>
												<View
													style={{
														flexDirection: "row",
														alignItems: "center",
														margin: 2,
													}}
												>
													<Text
														style={{
															fontSize: 14,
															opacity: 0.7,
															fontFamily: "inter-light",
															marginRight: 3,
														}}
													>
														{route.params.weight} Kg
													</Text>
													<FontAwesome5 name='weight-hanging' size={15} />
												</View>
											</BorderStyle>
										</View>
									</View>
								</View>
							</View>
						</View>
						<View style={styles.body}>


							{/* More Details */}
							<Text style={styles.textHead}>More Details</Text>
							<BorderStyle style={{ borderRadius: 10 }}>
								<Text style={styles.textBody}>{route.params.moreD}</Text>
							</BorderStyle>


							{/* Location */}
							<Text style={styles.textHead}>Location</Text>
							<BorderStyle>
								<View style={{ flexDirection: "row", alignItems: "center",padding:4 }}>
									<Image
										source={require("../assets/LocationImages/location.png")}
										style={styles.locImage}
									/>
									<Text style={styles.textBody}>{route.params.location}</Text>
									<FontAwesome name='location-arrow' size={24} />
								</View>
							</BorderStyle>
							<Text style={styles.textHead}>User Info</Text>
							<View>
								<Text style={styles.textBody}>{route.params.username}</Text>
							</View>
							<Text style={styles.textHead}>Preferred Payment Method</Text>
							<View>
								<Text>{route.params.prefPayment}</Text>
							</View>
							<View style={styles.chatNow}>
								<Text style={styles.chatNowText}>Chat now</Text>
							</View>
						</View>
					</View>
				</KeyboardAvoidingView>
			</ScrollView>
		</View>
	);
}

export default ItemDetailsScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.white,
		paddingTop: 15,
	},
	itemPhoto: {
		width: 130,
		height: 130,
		borderRadius: 20,
		marginRight: 20,
	},
	body: {
		marginTop: 1,
		backgroundColor: Colors.grayBackground,
		paddingHorizontal: 10,
		borderRadius: 10,
		paddingBottom: 20,
	},
	chatNow: {
		backgroundColor: Colors.darkGreen,
		borderRadius: 21,
		alignItems: "center",
	},
	chatNowText: {
		fontFamily: "inter-bold",
		color: Colors.white,
		fontSize: 20,
		padding: 8,
	},
	textTitle: {
		fontFamily: "inter-bold",
		color: Colors.black,
		fontSize: 24,
		width: 190,
	},
	priceText: {
		fontFamily: "inter-bold",
		color: Colors.darkGreen,
		fontSize: 18,
		paddingTop: 8,
	},
	qTwText: {
		fontFamily: "inter-regular",
		opacity: 0.9,
		fontSize: 15,
	},
	textHead: {
		fontFamily: "inter-bold",
		color: Colors.black,
		fontSize: 16,
		width: 190,
		paddingVertical: 6,
	},
	textBody: {
		fontFamily: "inter-regular",
		padding: 4,
	},
	locImage: {
		width: 60,
		height: 60,
		borderRadius: 10,
	},
});
