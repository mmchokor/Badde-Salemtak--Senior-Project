import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors } from '../../constants/colors';

function LoadingIcon() {
	const size = 100;

	return (
		<View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
			<ActivityIndicator size={60} color={Colors.darkGreen} />
		</View>
	);
}
export default LoadingIcon;

const styles = StyleSheet.create({});
