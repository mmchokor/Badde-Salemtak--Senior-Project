import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { RadioButton, ThemeProvider } from "react-native-paper";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Button from "../UI/ButtonProfile";
import { ScrollView } from "react-native-gesture-handler";

function ProfileComponent() {
	const navigation = useNavigation();
	function LogoutNavigationHandler() {
		navigation.navigate("Login");
	}
	const [checked, setChecked] = useState("National ID");

	return (
		<ScrollView style={styles.container}>
			<View style={styles.profilePicContainer}>
				<View style={styles.profilePic}>
					<Ionicons
						name='ios-person-outline'
						color={Colors.darkGreen}
						size={65}
						style={{ opacity: 0.6 }}
					/>
				</View>
				<Text style={styles.profileName}>Karam Timani</Text>
			</View>
			<View style={{ paddingTop: 12 }}>
				<Text style={styles.headerText}>Account Name</Text>
				<Text style={styles.infoText}>Karam Timani</Text>
				<Text style={styles.headerText}>First Name</Text>
				<Text style={styles.infoText}>Karam</Text>
				<Text style={styles.headerText}>Last Name</Text>
				<Text style={styles.infoText}>Timani</Text>
				<Text style={styles.headerText}>Email Address</Text>
				<Text style={styles.infoText}>karamtimani9@gmial.com</Text>
				<Text style={styles.headerText}>Identification</Text>
			</View>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					paddingHorizontal: 5,
					paddingTop: 10,
					alignItems: "center",
				}}
			>
				<RadioButton
					color={Colors.darkGreen}
					value='National ID'
					status={checked === "National ID" ? "checked" : "unchecked"}
					onPress={() => setChecked("National ID")}
				/>
				<Text style={[styles.headerText, { paddingRight: 40 }]}>
					National ID
				</Text>
				<RadioButton
					color={Colors.darkGreen}
					value='Password'
					status={checked === "Password" ? "checked" : "unchecked"}
					onPress={() => setChecked("Password")}
				/>
				<Text style={styles.headerText}>Passport</Text>
			</View>
			<View
				style={{
					flexDirection: "column",
					justifyContent: "space-between",
					paddingHorizontal: 45,
					paddingTop: 8,
				}}
			>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						paddingVertical: 5,
					}}
				>
					<Text
						style={[
							styles.infoText,
							{ borderBottomWidth: 0, marginBottom: 0, paddingBottom: 0 },
						]}
					>
						Front ID
					</Text>
					<View
						style={[styles.idPics, { marginBottom: 0, paddingBottom: 0 }]}
					></View>
				</View>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						paddingVertical: 5,
					}}
				>
					<Text
						style={[
							styles.infoText,
							{ borderBottomWidth: 0, marginBottom: 0, paddingBottom: 0 },
						]}
					>
						Front ID
					</Text>
					<View
						style={[styles.idPics, { marginBottom: 0, paddingBottom: 0 }]}
					></View>
				</View>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						paddingVertical: 5,
					}}
				>
					<Text
						style={[
							styles.infoText,
							{ borderBottomWidth: 0, marginBottom: 0, paddingBottom: 0 },
						]}
					>
						Front ID
					</Text>
					<View
						style={[styles.idPics, { marginBottom: 0, paddingBottom: 0 }]}
					></View>
				</View>
			</View>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					paddingBottom: 10,
				}}
			>
				<Button>Edit Profile</Button>
				<Button onPress={LogoutNavigationHandler}>Logout</Button>
			</View>
		</ScrollView>
	);
}
export default ProfileComponent;

const styles = StyleSheet.create({
	container: {
		// justifyContent: "center",
		// alignItems: "center",
		backgroundColor: Colors.white,
		paddingHorizontal: 30,
	},
	profilePic: {
		height: 90,
		width: 90,
		backgroundColor: Colors.grayBackground,
		borderRadius: 45,
		alignItems: "center",
		justifyContent: "center",
	},
	profilePicContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	profileName: {
		fontFamily: "inter-regular",
		fontSize: 24,
		paddingLeft: 15,
		color: Colors.black,
	},
	headerText: {
		fontFamily: "inter-light",
		color: Colors.darkGreen,
		fontSize: 18,
	},
	infoText: {
		fontFamily: "inter-regular",
		color: Colors.black,
		fontSize: 16,
		borderBottomWidth: 0.5,
		borderBottomColor: Colors.gray,
		marginBottom: 10,
		paddingBottom: 5,
	},
	idPics: {
		width: 50,
		height: 50,
		backgroundColor: Colors.gray,
		borderRadius: 10,
		marginLeft: 10,
	},
});
