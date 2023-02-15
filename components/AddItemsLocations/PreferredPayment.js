import { View, StyleSheet, Text,Image,TouchableOpacity ,} from "react-native";
import { Colors } from "../../constants/colors";
import {useState} from 'react';


function PreferredPayment() {
    const types = [
		{uri:require("../../assets/PaymentsLogos/cash-on-delivery-steacker-free-vector.webp")},
		{uri:require("../../assets/PaymentsLogos/Western-Union-Logo-768x432.png")},
        {uri:require("../../assets/PaymentsLogos/Artboard10.jpg")},
		
	];
    const [selectedOption, setSelectedOption] = useState("");
	return (
		<View style={styles.container}>
			
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

					<Image source={option.uri} style={{width:80,height:40}}/>
				</TouchableOpacity>
			))}
        </View>
	);
}
export default PreferredPayment;

const styles = StyleSheet.create({
	container: {
        marginTop:5,
		borderColor: Colors.gray,
		borderRadius: 5,
		padding: 10,
		elevation: 3,
		backgroundColor: Colors.white,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
    selectedOptionContainer: {
		opacity:0.4,
        borderWidth:2,
        borderColor:Colors.darkGreen,
        padding:4,
        borderRadius:10
	},
});
