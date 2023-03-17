import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import { favorites } from "../../store/Favorites/favorites";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";

const ListingOptions = ({ id }) => {
	const [fav, setFav] = useAtom(favorites);
	const [isFavorite, setIsFavorite] = useState(fav.includes(id));

	const addToFavorites = () => {
		if (!isFavorite) {
			setFav([...fav, id]);
			setIsFavorite(true);
		} else {
			setFav(fav.filter((item) => item !== id));
			setIsFavorite(false);
		}
	};

	const optionsHandler = () => {
		console.log("clicked2");
	};

	return (
		<View style={styles.optionsWrapper}>
			<FontAwesome
				style={styles.optionsIcon}
				name={isFavorite ? "bookmark" : "bookmark-o"}
				size={18}
				color={isFavorite ? Colors.red : Colors.gray}
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
