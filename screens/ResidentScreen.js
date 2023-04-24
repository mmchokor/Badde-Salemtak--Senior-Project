import { StyleSheet, Text, View, Pressable } from "react-native";
import ResidentListingList from "../components/Item/ResidentListingList";
import { useFocusEffect } from '@react-navigation/native';
import {useState,useCallback,useEffect} from 'react';
import Toast from "react-native-toast-message";

function ResidentScreen({route}) {
 
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
      <ResidentListingList />
    </View>
  );
}
export default ResidentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
