import {
	StyleSheet,
	Text,
	View,
	Pressable,
	KeyboardAvoidingView,
} from 'react-native';
import { Colors } from '../constants/colors';

import { ScrollView } from 'react-native-gesture-handler';
import AddItemBody from '../components/AddItemComp/AddItemBody';
function AddItemScreen({ navigation }) {
	function PressEventHandler() {
		navigation.navigate('Location');
	}
	return (
		<View style={{ backgroundColor: Colors.white }}>
			<View style={{ alignItems: 'center' }}>
				<View style={styles.upperButton}>
					<View style={styles.item}>
						<Text style={styles.textI}>Add Item</Text>
					</View>
					<Pressable onPress={PressEventHandler}>
						<View style={styles.location}>
							<Text style={styles.textLocation}>Add Location</Text>
						</View>
					</Pressable>
				</View>
			</View>

			<ScrollView>
				<KeyboardAvoidingView
					behavior='padding'
					enabled
					style={{ height: 900 }}
				>
					<AddItemBody />
				</KeyboardAvoidingView>
			</ScrollView>
		</View>
	);
}

export default AddItemScreen;

const styles = StyleSheet.create({
	upperButton: {
		margin: 5,
		width: 190,
		height: 45,
		backgroundColor: Colors.darkGreen,
		borderRadius: 30,
		alignItems: 'center',
		alignContent: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	item: {
		backgroundColor: Colors.white,
		padding: 7,
		marginLeft: 7,
		color: Colors.white,
		borderRadius: 30,
	},
	location: {
		padding: 5,
		borderRadius: 30,
		marginRight: 7,
		borderRadius: 30,
	},
	textI: {
		fontFamily: 'inter-regular',
		color: Colors.black,
	},
	textLocation: {
		color: Colors.white,
		fontFamily: 'inter-regular',
	},
	
});
