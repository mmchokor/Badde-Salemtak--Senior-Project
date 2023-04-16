import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Pressable,
	KeyboardAvoidingView,
	FlatList,
} from 'react-native';
import { Colors } from '../constants/colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';
import { flags } from '../constants/flags';
import BorderStyle from '../components/AddItemsLocations/BorderStyle';
import ItemType from '../components/AddItemsLocations/ItemType';
import InputBorderStyle from '../components/AddItemsLocations/InputBorderStyle';
import PreferredPayment from '../components/AddItemsLocations/PreferredPayment';
import DropDownPicker from 'react-native-dropdown-picker';
import Button from '../components/UI/Button';
function AddLocationScreen({ navigation }) {
	function PressEventHandler() {
		navigation.navigate('Item');
	}
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState([flags]);
	const [weight, setWeight] = useState('');// Preferred Weight
	
	
	const searchValue = (flags, value) => {
		for (const key in flags) {
			if (flags[key] === value) {
				return key;
			}	
		}	
		return null;
	};	
	const setSelectedCountry = searchValue(flags, value);//Selected Country
	
	const handleInputWeight = (text) => {
		setWeight(text);
	};
	
	function handleAddLocation() {
		console.log(setSelectedCountry);
	}

	return (
		<View
			style={{
				alignItems: 'center',
				backgroundColor: Colors.white,
				marginTop: 30,
			}}
		>
			<View style={styles.upperButton}>
				<Pressable onPress={PressEventHandler}>
					<View style={styles.item}>
						<Text style={styles.texI}>Add Item</Text>
					</View>
				</Pressable>
				<View style={styles.location}>
					<Text style={styles.textLocation}>Add Location</Text>
				</View>
			</View>

			{/* <ScrollView>
				<KeyboardAvoidingView
					behavior='padding'
					enabled
					style={{ height: 720 }}
				>  */}
			<View style={{ paddingHorizontal: 90 }}>
				<Text
					style={{
						color: Colors.black,
						fontSize: 18,
						fontFamily: 'inter-regular',
						marginTop: 15,
						marginBottom: 10,
					}}
				>
					Country Name From
				</Text>
				{/* <TextInput style={styles.inputT} /> */}

				<View>
					<DropDownPicker
						open={open}
						value={value}
						items={Object.entries(items[0]).map(([label, value]) => ({
							label,
							value,
						}))}
						setOpen={setOpen}
						setValue={setValue}
						setItems={setItems}
						searchable={true}
						searchPlaceholder='Search country'
						searchContainerStyle={{
							borderWidth: 0,
							borderColor: Colors.lightGray,
							borderBottomColor: Colors.lightGray,
						}}
						searchTextInputStyle={{
							borderWidth: 1,
							borderColor: Colors.lightGray,
							borderRadius: 15,
						}}
						style={{
							zIndex: 1,
							borderRadius: 15,
							borderWidth: 1,
							borderColor: Colors.lightGray,
						}}
						dropDownContainerStyle={{
							borderWidth: 1,
							borderColor: Colors.lightGray,
							borderRadius: 15,
						}}
						textStyle={{
							fontSize: 16,
							fontFamily: 'inter-light',
						}}
						placeholder='Choose country'
						labelStyle={{
							color: Colors.darkGreen,
						}}
					/>
				</View>

				<ScrollView showsVerticalScrollIndicator={false}>
					<KeyboardAvoidingView
						behavior='padding'
						enabled
						style={{ height: 700 }}
					>
						<View>
							<Text style={styles.textHead}>Preferred Weight</Text>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<BorderStyle>
									<View style={{ flexDirection: 'row', alignItems: 'center' }}>
										<FontAwesome5 name='weight-hanging' size={15} />
										<Text
											style={{
												fontSize: 12,
												opacity: 0.7,
												fontFamily: 'inter-light',
											}}
										>
											Kg
										</Text>
									</View>
								</BorderStyle>
								<TextInput
									style={[styles.inputT, { marginLeft: 10, width: 50 }]}
									keyboardType='number-pad'
									maxLength={5}
									onChangeText={handleInputWeight}
									value={weight}
								/>
							</View>
						</View>

						{/* Type */}
						<View style={{ marginTop: 2 }}>
							<Text style={[styles.textHead, { marginBottom: 6 }]}>
								Preferred Type
							</Text>
							<ItemType />
						</View>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={styles.textHead}>Ticket Number:</Text>

							<TextInput
								style={[styles.inputT, { width: 100, marginLeft: 10 }]}
								keyboardType='default'
								autoCapitalize='characters'
								maxLength={5}
							/>
						</View>
						{/* More Details,Location */}

						<Text style={styles.textHead}>More Details</Text>
						<InputBorderStyle style={{ padding: 5 }} />

						<Text style={styles.textHead}>Preferred Payment Method</Text>

						<PreferredPayment />
						<View style={{ marginTop: -10 }}>
							<Button onPress={() => handleAddLocation()}>Add Location</Button>
						</View>
					</KeyboardAvoidingView>
				</ScrollView>
			</View>
			{/* </KeyboardAvoidingView>
			</ScrollView> */}
		</View>
	);
}

export default AddLocationScreen;

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
		justifyContent: 'space-evenly',
	},
	item: {
		padding: 5,
		borderRadius: 30,
		marginLeft: 7,
		color: Colors.white,
	},
	location: {
		backgroundColor: Colors.white,
		padding: 7,
		borderRadius: 30,
		marginRight: 7,
	},
	texI: {
		fontFamily: 'inter-regular',
		color: Colors.white,
	},
	textLocation: {
		color: Colors.black,
		fontFamily: 'inter-regular',
	},
	textHead: {
		color: Colors.black,
		fontSize: 18,
		fontFamily: 'inter-regular',
		marginTop: 20,
		marginBottom: 10,
	},
	inputT: {
		fontFamily: 'inter-regular',
		color: Colors.black,
		fontSize: 16,
		borderBottomWidth: 0.5,
		borderBottomColor: Colors.gray,
	},
	textL: {
		color: Colors.darkGreen,
		fontFamily: 'inter-light',
	},
});
