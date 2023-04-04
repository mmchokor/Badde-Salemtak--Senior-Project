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

function NotificationsScreen({ navigation, route }) {
	const [notification, setNotification] = useAtom(notifications);

	if (notification.length == 0) {
		return (
			<View>
				<Text>Nothing to see here</Text>
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
});
