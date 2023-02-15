import BorderStyle from "./BorderStyle";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "../../constants/colors";
import { useState } from "react";
import {
	Feather,
	Fontisto,
	Ionicons,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
function ButtonItemType({ text, onPress, style }) {
	const theIcon = () => {
		if (text === "Electronics") {
			return <Ionicons name='md-phone-portrait-outline' size={16} />;
		} else if (text === "Food") {
			return (
				<MaterialCommunityIcons name='food-takeout-box-outline' size={16} />
			);
		} else if (text === "Clothes") {
			return <Ionicons name='shirt-outline' size={16} />;
		} else if (text === "Medicine") {
			return <Fontisto name='pills' size={16} />;
		} else if (text === "Accessories") {
			return <Feather name='watch' size={16} />;
		} else {
			return (
				<MaterialCommunityIcons
					name='dots-horizontal-circle-outline'
					size={16}
				/>
			);
		}
	};
	return (
		<View  onPress={onPress} style={styles.buttonStyle}>
			<View style={[{ flexDirection: "row", alignItems: "center"},] }>
				<View style={{ marginRight: 5 }}>{theIcon()}</View>
				<Text
					style={{
						fontSize: 14,
						opacity: 1,
						fontFamily: "inter-regular",
                        
					}}
				>
					{text}
				</Text>
			</View>
		</View>
	);
}
export default ButtonItemType;

const styles = StyleSheet.create({
	container: {
		marginRight: 10,
		marginBottom: 5,
		borderWidth: 1,
	},
    buttonStyle:{
        borderColor: Colors.gray,
		borderRadius: 5,
		padding: 4,
	//	elevation: 3,
		backgroundColor: Colors.white,
        borderWidth:0.3,
        margin:2,
       
    }
});
