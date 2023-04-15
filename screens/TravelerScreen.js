import { StyleSheet, Text, View } from 'react-native';
import ListingList from '../components/Item/ListingList.js';
import Toast from 'react-native-toast-message';
import { useEffect, useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { isTravScreenAtom } from '../store/TravResScreen/TravOrRes';
import { useAtom } from 'jotai';

function TravelerScreen({ route }) {
	const [travS, setTravS] = useAtom(isTravScreenAtom);

	useFocusEffect(
		useCallback(() => {
			setTravS(true);
			return () => {
				setTravS(false);
			};
		}, []),
	);

	useEffect(() => {
		const loading = route.params?.load;
		{
			loading &&
				Toast.show({
					type: 'success',
					text1: 'Success!',
					text2: 'Your listing has been added 👋',
				});
		}
	}, [route]);

	return (
		<View style={styles.container}>
			{/* {loading &&
        Toast.show({
          type: "success",
          text1: "Hello",
          text2: "This is some something 👋",
        })} */}
			<ListingList />
		</View>
	);
}
export default TravelerScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
