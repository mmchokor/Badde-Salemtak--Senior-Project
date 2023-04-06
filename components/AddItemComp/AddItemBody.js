import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { useMutation, useQuery } from 'react-query';
import { createResidentListing } from '../../api/residentListingsAPI';
import BorderStyle from '../../components/AddItemsLocations/BorderStyle';
import InputBorderStyle from '../../components/AddItemsLocations/InputBorderStyle';
import ItemType from '../../components/AddItemsLocations/ItemType';
import PreferredPayment from '../../components/AddItemsLocations/PreferredPayment';
import QuantityButton from '../../components/AddItemsLocations/QuantityButton';
import Button from '../../components/UI/Button';
import { Colors } from '../../constants/colors';
import ImageUpload from './ImageUpload';
function AddItemBody() {
	const { mutate, error } = useMutation(createResidentListing);
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
	const [selectedImage, setSelectedImage] = useState([]);

	function handleImageSelect(image) {
		setSelectedImage(image);
	
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
			cityOfResidence: cityOfResidence,
			approximateWeight: approximateWeight,
			quantity: quantity,
			price: price,
			paymentMethod: paymentMethod,
			productType: productType,
			// images: selectedImage,
		};
		// console.log(formData);
		mutate(data);
	};

	return (
		<View style={{ paddingHorizontal: 20 }}>
			<Text style={styles.textHead}>Item Name*</Text>
			<TextInput
				style={styles.inputT}
				onChangeText={handleInputName}
				value={itemName}
				maxLength={70}
			/>
			{/* Price View */}
			<Text style={[styles.textHead, { marginTop: 20 }]}>Price</Text>

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
			<View style={styles.imageS}>
				<ImageUpload onSelectImage={handleImageSelect} />
			</View>

			{/* Quantity and Weight View */}
			<View style={{ flexDirection: 'row', marginTop: 20 }}>
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
			<View style={{ marginTop: 20 }}>
				<Text style={[styles.textHead, { marginBottom: 6 }]}>Type</Text>
				<ItemType onSelect={handleType} />
			</View>

			{/* More Details,Location */}
			<View style={{ marginTop: 20 }}>
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
		//color: Colors.darkGreen,
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
	imageS: {
		position: 'absolute',
		right: 100,
		top: 70,
		right: 20,
	},
});
