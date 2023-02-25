import { StyleSheet, Text, View, FlatList } from "react-native";
import { useAtom } from "jotai";
import { favorites } from "../components/Listings/ListingOptions";
import { Listing } from "../components/Item/Listing";
function FavoritesScreen() {
	const [fav] = useAtom(favorites);

	return (
		<View style={styles.wrapper}>
			<FlatList data={fav} renderItem={({ item }) => <Text>{item}</Text>} />
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
