import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";
import { useNavigation } from '@react-navigation/native';


function HomeScreen() {
	const navigation = useNavigation();
	return (
		<View style={{alignItems:"center"}}>
			<View style={styles.upperButton}>
				<View style={styles.traveler}>
					<Text style={styles.textT}>Traveler</Text>
				</View>
				<View style={styles.resident} onPress={() => navigation.navigate('Fav')}>
					<Text style={{color:Colors.white,fontFamily:'inter-regular'}}>Resident</Text>
				</View>
			</View>
		</View>
	);
}
export default HomeScreen;

const styles = StyleSheet.create({
	upperButton: {
		margin: 5,
		width: 180,
		height: 60,
		backgroundColor: Colors.darkGreen,
		borderRadius: 30,
		alignItems: "center",
		alignContent: "center",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	traveler: {
		backgroundColor: Colors.white,
		padding: 15,
		borderRadius: 30,
		marginLeft: 7,
	},
	resident: {
		//backgroundColor: Colors.white,
		padding: 15,
		borderRadius: 30,
		marginRight: 7,
		
	},
	textT:{
		fontFamily:'inter-regular'
	}
});
