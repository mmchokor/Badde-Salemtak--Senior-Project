import { StyleSheet, Text, TextInput, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { useState } from 'react';
import BorderStyle from '../../components/AddItemsLocations/BorderStyle';
import ItemType from '../../components/AddItemsLocations/ItemType';
import InputBorderStyle from '../../components/AddItemsLocations/InputBorderStyle';
import PreferredPayment from '../../components/AddItemsLocations/PreferredPayment';
import QuantityButton from '../../components/AddItemsLocations/QuantityButton';
import Button from '../../components/UI/Button';

function AddItemBody() {
	const [itemName, setItemName] = useState('');
	const [itemPrice, setPrice] = useState('');
	const [quantity, setQuantity] = useState(0);
	const [itemWeight, setWeight] = useState('');
	const [itemType, setType] = useState('');

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

	console.log();

	return (
		<View style={{ paddingHorizontal: 20 }}>
			<Text style={styles.textHead}>Item Name*</Text>
			<TextInput
				style={styles.inputT}
				onChangeText={handleInputName}
				value={itemName}
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
				<InputBorderStyle />
				<Text style={styles.textHead}>Location</Text>
				<Text style={styles.textL}>Address*</Text>
				<InputBorderStyle />
				<Text style={styles.textL}>Street Name*</Text>
				<InputBorderStyle />
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<View>
						<Text style={[styles.textL, { width: 250 }]}>Building*</Text>
						<InputBorderStyle />
					</View>
					<View style={{}}>
						<Text style={[styles.textL, { width: 60 }]}>Floor</Text>
						<InputBorderStyle keyboardType='number-pad' maxLength={4} />
					</View>
				</View>
				<Text style={styles.textL}>Additional Description</Text>
				<InputBorderStyle />
				<Text style={styles.textHead}>Preferred Payment Method</Text>
			</View>

			<PreferredPayment />

			<Button style={styles.button}>Add Item</Button>
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
});
