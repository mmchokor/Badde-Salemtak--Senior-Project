import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { useState } from 'react';
import BorderStyle from '../../components/AddItemsLocations/BorderStyle';
import ItemType from '../../components/AddItemsLocations/ItemType';
import InputBorderStyle from '../../components/AddItemsLocations/InputBorderStyle';
import PreferredPayment from '../../components/AddItemsLocations/PreferredPayment';
import QuantityButton from '../../components/AddItemsLocations/QuantityButton';
import Button from '../../components/UI/Button';
import { useMutation, useQuery } from 'react-query';
import { createResidentListing } from '../../api/residentListingsAPI';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AddItemBody() {
	const { mutate, error } = useMutation(createResidentListing);
	const [image, setImage] = useState('');
	const [itemName, setItemName] = useState('');
	const [itemPrice, setPrice] = useState('');
	const [quantity, setQuantity] = useState(0);
	const [itemWeight, setWeight] = useState('');
	const [itemType, setType] = useState('');
	const [details, setDetails] = useState('');
	const [address, setAddress] = useState('');
	const [streetName, setStreetName] = useState('');
	const [building, setBuilding] = useState('');
	const [floor, setFloor] = useState('');
	const [selectedOption, setSelectedOption] = useState('');

	async function openGallery() {
		let image = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 4],
			quality: 1,
		});
		if (!image.canceled) {
			//console.log(image.assets[0].uri);
			setImage(image.assets[0].uri);
		}
	}
	const handleInputName = (text) => {
		setItemName(text);
	};
	const handleInputPrice = (text) => {
		setPrice(text);
	};

	const updateQuantity = (newQuantity) => {
		setQuantity(newQuantity);
	};

	const handleInputWeight = (text) => {
		setWeight(text);
	};
	const handleType = (option) => {
		setType(option);
	};

	const handleDetails = (text) => {
		setDetails(text);
	};
	const handleAddress = (text) => {
		setAddress(text);
	};
	const handleStreetName = (text) => {
		setStreetName(text);
	};
	const handleBuilding = (text) => {
		setBuilding(text);
	};

	const handleFloor = (text) => {
		setFloor(text);
	};
	function handlePaymentMethod(option) {
		setSelectedOption(option);
	}
	let type = '';

	switch (itemType) {
		case 0:
			type = 'Electronics';
			break;
		case 1:
			type = 'Food';
			break;
		case 2:
			type = 'Clothes';
			break;
		case 3:
			type = 'Medicine';
			break;
		case 4:
			type = 'Accessories';
			break;
		case 5:
			type = 'Others';
			break;
		default:
			type = 'Others';
	}
	let PreferredPaymentMethod = '';

	switch (selectedOption) {
		case 0:
			PreferredPaymentMethod = 'Cash';
			break;
		case 1:
			PreferredPaymentMethod = 'MoneyTransfer';
			break;
		case 2:
			PreferredPaymentMethod = 'BankTransfer';
			break;

		default:
			type = 'Cash';
	}

	function handleAddItem() {
		addTheItem();
	}

	const addTheItem = async () => {
		const user = await AsyncStorage.getItem('userID');
		const name = itemName.toString();
		const price = parseInt(itemPrice);
		//quantity
		const approximateWeight = parseInt(itemWeight);
		const productType = type.toString();
		const description = details.toString();
		const cityOfResidence =
			address + ' ' + streetName + ' ' + building + ' ' + floor;
		const paymentMethod = PreferredPaymentMethod;
		const data = {
			name: name,
			description: description,
			user: user,
			cityOfResidence: cityOfResidence,
			approximateWeight: approximateWeight,
			quantity: quantity,
			price: price,
			paymentMethod: paymentMethod,
			productType: productType,
		};
		console.log(data, user);
		mutate(data, user);
	};
	let imagePreview = <Text style={styles.previewText}>No image taken yet</Text>;

	if (image) {
		imagePreview = <Image source={{ uri: image }} style={styles.imageStyle} />;
	}
	return (
		<View style={{ paddingHorizontal: 20 }}>
			<Text style={styles.textHead}>Item Name*</Text>
			<TextInput
				style={styles.inputT}
				onChangeText={handleInputName}
				value={itemName}
				maxLength={70}
			/>
			<Text style={styles.textHead}>Price</Text>

			{/* Price View */}
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<BorderStyle>
					<Text
						style={{
							fontSize: 12,
							opacity: 0.7,
							fontFamily: 'inter-light',
						}}
					>
						USD
					</Text>
				</BorderStyle>

				<TextInput
					style={[styles.inputT, { marginLeft: 10, width: 50 }]}
					keyboardType='number-pad'
					maxLength={5}
					onChangeText={handleInputPrice}
					value={itemPrice}
				/>
			</View>

			{/* Quantity and Weight View */}
			<View style={{ flexDirection: 'row', marginTop: 2 }}>
				<View style={{ marginRight: 70 }}>
					<Text style={styles.textHead}>Quantity</Text>
					<View>
						<QuantityButton onUpdateQuantity={updateQuantity} />
					</View>
				</View>
				<View>
					<Text style={styles.textHead}>Weight</Text>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<BorderStyle>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<FontAwesome5 name='weight-hanging' size={14} />
								<Text
									style={{
										fontSize: 14,
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
							value={itemWeight}
						/>
					</View>
				</View>
			</View>

			{/* Type */}
			<View style={{ marginTop: 2 }}>
				<Text style={[styles.textHead, { marginBottom: 6 }]}>Type</Text>
				<ItemType onSelect={handleType} />
			</View>

			{/* More Details,Location */}
			<View>
				<Text style={styles.textHead}>More Details</Text>
				<InputBorderStyle onChangeText={handleDetails} />
				<Text style={styles.textHead}>Location</Text>
				<Text style={styles.textL}>Address*</Text>
				<InputBorderStyle onChangeText={handleAddress} />
				<Text style={styles.textL}>Street Name*</Text>
				<InputBorderStyle onChangeText={handleStreetName} />
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<View>
						<Text style={[styles.textL, { width: 250 }]}>Building*</Text>
						<InputBorderStyle onChangeText={handleBuilding} />
					</View>
					<View style={{}}>
						<Text style={[styles.textL, { width: 60 }]}>Floor</Text>
						<InputBorderStyle
							keyboardType='number-pad'
							maxLength={4}
							onChangeText={handleFloor}
						/>
					</View>
				</View>
			</View>
			<Text style={styles.textHead}>Preferred Payment Method</Text>

			<PreferredPayment onSelectOption={handlePaymentMethod} />

			<Button style={styles.button} onPress={handleAddItem}>
				Add Item
			</Button>
		</View>
	);
}

export default AddItemBody;

const styles = StyleSheet.create({
	textHead: {
		color: Colors.darkGreen,
		fontSize: 18,
		fontFamily: 'inter-regular',
		marginTop: 10,
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
	button: {
		width: '80%',
		margin: 10,
		marginTop: 0,
	},
	imagepreviewcontainer: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: 200,
		backgroundColor: '#f0cced',
		marginVertical: 8,
		borderRadius: 8,
	},
	previewText: {
		color: '#592454',
	},
	imageStyle: {
		width: '100%',
		height: '100%',
	},
});
