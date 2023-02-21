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
import DetailsBody from "../components/DetailsItemLocation/DetailsBody";
import Weight from "../components/DetailsItemLocation/Weight";

function LocationDetailsScreen({ route }) {
	return (
		<View>
			{/* <Text>Location Details Screen:{route.params.id}  {route.params.title}</Text> */}

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
									
								</View>
								<View>
									{/* Title */}
									<Text>From</Text>
									<MyText style={styles.textTitle}>{route.params.fromLocation}</MyText>
									<Text>To</Text>
									<MyText style={styles.textTitle}>{route.params.toLocation}</MyText>
									

									{/* Weight */}
									<View style={{ marginTop: 8,flexDirection:"column",alignItems:"flex-start"}}>
										
										<View
											style={{ alignItems: "center", flexDirection: "row" }}
										>
										
											<Text style={[styles.qTwText, { marginRight: 14 }]}>
												Weight
											</Text>
											<Weight value={route.params.maxWeight} />
										</View>
									<View style={{ marginTop: 10 }}>
										<ButtonItemType text={route.params.type} />
									</View>
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
		paddingTop: 15,
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
});
