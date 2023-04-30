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
		const isOffer = route.params?.isOffer;
		{
			loading &&
				Toast.show({
					type: 'success',
					text1: 'Success!',
					text2: 'Your listing has been added 👋',
				});
		}
		{
			isOffer &&
				Toast.show({
					type: 'success',
					text1: 'Success!',
					text2: 'Your Offer has been sent 👋',
				});
		}
	}, [route]);

	return (
		<View style={styles.container}>
			{/* {
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
