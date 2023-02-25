import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import { atom } from "jotai";
import { useAtom } from "jotai";
import { useState,useEffect } from "react";
export const favorites = atom([]);

const ListingOptions = ({ id }) => {
	const [fav, setFav] = useAtom(favorites);
	

	const addToFavorites = () => {
		if (!fav.includes(id)) {
      setFav([...fav,id]);
      console.log("clicked2");
    }
   
	};

	const optionsHandler = () => {
		console.log("clicked2");
	};

	return (
		<View style={styles.optionsWrapper}>
			<FontAwesome5
				style={styles.optionsIcon}
				name='bookmark'
				size={16}
				color='black'
				onPress={addToFavorites}
			/>
			<SimpleLineIcons
				style={styles.optionsIcon}
				name='options-vertical'
				size={16}
				color={Colors.gray}
				onPress={optionsHandler}
			/>
		</View>
	);
};

export default ListingOptions;

const styles = StyleSheet.create({
	optionsWrapper: {
		flexDirection: "row",
		position: "absolute",
		right: 3,
		zIndex: 100,
	},
	optionsIcon: {
		paddingHorizontal: 5,
		paddingVertical: 5,
	},
});
