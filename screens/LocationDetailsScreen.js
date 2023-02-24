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
import {
	FontAwesome5,
	FontAwesome,
	Ionicons,
	Feather,
} from "@expo/vector-icons";

import MyText from "../components/UI/MyText";
import DetailsBody from "../components/DetailsItemLocation/DetailsBody";
import Weight from "../components/DetailsItemLocation/Weight";
import CountryFlag from "react-native-country-flag";
import CFlag from "../constants/CFlag";

function LocationDetailsScreen({ route }) {
	return (
		<View>
			{/* <Text>Location Details Screen:{route.params.id}  {route.params.title}</Text> */}

			<ScrollView showsVerticalScrollIndicator={false}>
				<KeyboardAvoidingView behavior='padding'>
					<View style={styles.container}>
						<View style={{ paddingBottom: 5, paddingHorizontal: 10 }}>
							<View
								style={{
									flexDirection: "column",
									alignItems: "baseline",
								}}
							>
								<View>
									<View
										style={{
											flexDirection: "row",
											alignItems: "center",
										}}
									>
										<FontAwesome
											name='paper-plane'
											size={18}
											color={Colors.darkGreen}
										/>
										<MyText
											style={{
												marginLeft: 8,
												fontSize: 18,
												color: Colors.black,
											}}
										>
											From:
										</MyText>
									</View>
									<View
										style={{
											flexDirection: "row",
											alignItems: "center",
											marginLeft: 60,
										}}
									>
										<CFlag country={route.params.fromLocation} s={28} />
										<MyText style={[styles.textTitle, { marginLeft: 10 }]}>
											{route.params.fromLocation}
										</MyText>
									</View>
								</View>
								<View style={{ marginTop: 10 }}>
									<View
										style={{
											flexDirection: "row",
											alignItems: "center",
										}}
									>
										<Ionicons name='location-sharp' size={18} color='red' />
										<MyText
											style={{
												marginLeft: 8,
												fontSize: 18,
												color: Colors.black,
											}}
										>
											To:
										</MyText>
									</View>

									<View
										style={{
											flexDirection: "row",
											alignItems: "center",
											marginLeft: 60,
										}}
									>
										<CFlag country={route.params.toLocation} s={28} />
										<MyText style={[styles.textTitle, { marginLeft: 10 }]}>
											{route.params.toLocation}
										</MyText>
									</View>
								</View>
							</View>

							{/* Weight and Type */}
							<View style={{ marginTop: 10 }}>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
									}}
								>
									<Feather
										name='check-circle'
										size={18}
										color={Colors.darkGreen}
									/>
									<MyText
										style={{
											marginLeft: 8,
											fontSize: 18,
											color: Colors.black,
										}}
									>
										Preferred:
									</MyText>
								</View>

								<View
									style={{
										alignItems: "center",
										flexDirection: "row",
									}}
								>
									<View>
										<Text
											style={[
												styles.qTwText,
												{ marginRight: 10, marginLeft: 10 },
											]}
										>
											Type
										</Text>
										<View>
											<ButtonItemType text={route.params.type} />
										</View>
									</View>
									{/* Weight */}
									<View style={{ marginLeft: 50 }}>
										<Text
											style={[
												styles.qTwText,
												{ marginRight: 10, marginLeft: 10 },
											]}
										>
											Weight
										</Text>
										<Weight value={route.params.maxWeight} />
									</View>
								</View>
							</View>
						</View>
						
						{/* Body */}
						<DetailsBody
							details={route.params.moreD}
							location={route.params.userLocation}
							username={route.params.username}
							payment={route.params.prefPayment}
						/>
					</View>
				</KeyboardAvoidingView>
			</ScrollView>
		</View>
	);
}

export default LocationDetailsScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.white,
		paddingTop: 10,
	},
	itemPhoto: {
		width: 130,
		height: 130,
		borderRadius: 20,
		marginRight: 20,
	},

	textTitle: {
		fontFamily: "inter-bold",
		color: Colors.black,
		fontSize: 35,
		width: 190,
		//backgroundColor: "black",
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
});
