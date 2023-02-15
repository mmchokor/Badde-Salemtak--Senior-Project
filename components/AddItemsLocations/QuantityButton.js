import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import BorderStyle from "./BorderStyle";
import { Colors } from "../../constants/colors";
function QuantityButton() {
	const [number, setNumber] = useState(0);

	const incrementNumber = () => {
		setNumber(number + 1);
	};

	const decrementNumber = () => {
		setNumber(number - 1);
		if (number < 1) {
			setNumber(0);
		}
	};

	return (
		<BorderStyle>
			<View style={styles.container}>
				<AntDesign name='caretdown' onPress={decrementNumber} size={15} color={Colors.black}/>
				<Text style={styles.number}>x{number}</Text>
				<AntDesign name='caretup' onPress={incrementNumber} size={15} color={Colors.black}/>
			</View>
		</BorderStyle>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
	},
	number: {
		fontSize: 15,
		fontFamily: "inter-regular",
		color:Colors.black,
	},

});

export default QuantityButton;
