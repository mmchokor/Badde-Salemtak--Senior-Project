import {
	View,
	StyleSheet,
	Alert,
	TouchableOpacity,
	Text,
	Pressable,
} from "react-native";
import { useState } from "react";
import { Colors } from "../../constants/colors";
import ButtonItemType from "./ButtonItemType";
function ItemType() {
	const types = [
		"Electronics",
		"Food",
		"Clothes",
		"Medicine",
		"Accessories",
		"Others",
	];

	const [selectedOption, setSelectedOption] = useState("");

	return (
		<View
			style={{
				flexWrap: "wrap",
				alignItems: "center",
				flexDirection: "row",
			}}
		>
			{types.map((option, name) => (
				<TouchableOpacity
					key={name}
					onPress={() => setSelectedOption(name)}
					style={
						selectedOption === name
							? styles.selectedOptionContainer
							: styles.optionContainer
					}
				>
					{/* <View>
						{selectedOption === name && Alert.alert(`${selectedOption}`)}
					</View> */}

					<ButtonItemType text={option} />
				</TouchableOpacity>
			))}
		</View>
	);
}
export default ItemType;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},

	selectedOptionContainer: {
		opacity:0.4
	},
	selectedRadioButton: {
		width: 10,
		height: 10,

		backgroundColor: "black",
	},
	optionText: {
		fontSize: 16,
	},
});
