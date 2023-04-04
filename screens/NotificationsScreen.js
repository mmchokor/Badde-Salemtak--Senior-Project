import {
	Pressable,
	StyleSheet,
	Text,
	View,
	FlatList,
	Image,
} from 'react-native';
import { Colors } from '../constants/colors';
import NotificationOrderReceived from '../components/Notifications/NotificationOrderReceived';
import { useAtom } from 'jotai';
import { notifications } from '../store/Notifications/notification';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import Button from '../components/UI/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
function NotificationsScreen({ navigation, route }) {
	const [image, setImage] = useState('');

	const [notification, setNotification] = useAtom(notifications);

	let imagePreview = <Text style={styles.previewText}>Upload Image</Text>;

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
	if (image) {
		imagePreview = <Image source={{ uri: image }} style={styles.imageStyle} />;
	}
	if (notification.length == 0) {
		return (
			<View>
				<Text>Nothing to see here</Text>
				<View>
					<View>
						<Pressable onPress={() => openGallery()}>
							<View style={styles.imagepreviewcontainer}>{imagePreview}</View>
						</Pressable>
					</View>

					<MaterialCommunityIcons
						name='delete-alert-outline'
						size={30}
						color={Colors.darkGreen}
						onPress={() => setImage('')}
					/>
				</View>
			</View>
		);
	} else {
		const { image, price, title, location, username } = route.params;

		return (
			<View>
				<FlatList
					data={notification}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<NotificationOrderReceived
							key={item.id}
							image={item.image}
							price={item.price}
							title={item.title}
							location={item.location}
							message={item.message}
							date={item.selectedDate}
							id={item.id}
							username={item.username}
							totalPrice={item.totalPrice}
						/>
					)}
				/>
			</View>
		);
	}
}

export default NotificationsScreen;

const styles = StyleSheet.create({
	cardWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 20,
		marginTop: 20,
	},
	contentWrapper: {
		marginLeft: 10,
	},
	profileImg: {
		height: 40,
		width: 40,
		borderRadius: 20,
		backgroundColor: Colors.lightGreen,
		marginRight: 2,
	},
	timeReceived: {
		fontSize: 12,
		color: Colors.lightGray,
	},
	username: {
		fontFamily: 'inter-bold',
		color: Colors.darkGreen,
	},
	buttonWrapper: {
		flexDirection: 'row',
		marginTop: 10,
	},
	button: {
		padding: 8,
		borderRadius: 6,
		borderColor: Colors.lightGray,
		borderWidth: 1,
		marginRight: 5,
	},
	buttonAccept: {
		backgroundColor: Colors.darkGreen,
	},
	text: {
		fontSize: 14,
	},
	textAccept: {
		color: Colors.white,
	},
	//For the image
	imagepreviewcontainer: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 100, //may be 90
		width: 100,
		borderRadius: 8,
		backgroundColor: '#848484',
		marginVertical: 8,
		borderRadius: 10,
	},
	previewText: {
		color: Colors.black,
	},
	imageStyle: {
		height: 100, //may be 90
		width: 100,
		borderRadius: 8,
		borderRadius: 10,
	},
});
