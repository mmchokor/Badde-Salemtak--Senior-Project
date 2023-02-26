import { StyleSheet, Text, View, FlatList } from "react-native";
import { useAtom } from "jotai";
import { favorites } from "../store/Favorites/favorites";

function FavoritesScreen() {
	const [fav, setFav] = useAtom(favorites);
	return (
		<View style={styles.wrapper}>
			<FlatList
				data={fav}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => <Text>{item}</Text>}
			/>
		</View>
	);
}
export default FavoritesScreen;

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		marginHorizontal: 4, //15
	},
});
