import { Pressable, StyleSheet, Text, View, } from "react-native";
import React from "react";
import { Colors } from "../../constants/colors";



const ButtonProfile = ({ onPress, children }) => {
	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => (pressed ? [styles.pressed,styles.container] : styles.container)}>
			<View style={styles.wrapper}>
				<Text style={styles.text}>{children}</Text>
			</View>
		</Pressable>
	);
};

export default ButtonProfile;

const styles = StyleSheet.create({
	container: {
		width: 150,
		paddingHorizontal: 6,
	},
	wrapper: {
		marginTop: 2,
		backgroundColor: Colors.darkGreen,
		//padding: Platform.OS === "ios" ? 16 : 12,
		borderRadius: 40,
        padding:12
	},
	text: {
		color: Colors.white,
		textAlign: "center",
        fontSize:16,
		//fontSize: Platform.OS === "ios" ? 20 : 16,
		fontFamily: "inter-regular",
	},
	pressed: {
		opacity: 0.75,
	},
});
