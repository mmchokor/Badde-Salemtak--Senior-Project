import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import Listing from "./Listing";
import { DUMMY_DATA } from "../../constants/DUMMY_DATA";
import { useNavigation } from "@react-navigation/native";
const ListingList = () => {
	const navigation = useNavigation();

	return (
		<View style={styles.wrapper}>
			<FlatList
				showsVerticalScrollIndicator={false}
				data={DUMMY_DATA}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<Listing
						onPress={() =>
							navigation.navigate("ItemDetails", {
								id: item.id,
								title: item.title,
								location: item.location,
								rating: item.rating,
								type: item.type,
								price: item.price,
								quantity: item.quantity,
								weight: item.weight,
								username: item.username,
								imageSrc: item.imageSrc,
								timePosted: item.timePosted,
                moreD:item.moreD,
                prefPayment:item.prefPayment
							})
						}
						id={item.id}
						title={item.title}
						location={item.location}
						rating={item.rating}
						type={item.type}
						price={item.price}
						quantity={item.quantity}
						weight={item.weight}
						username={item.username}
						imageSrc={item.imageSrc}
						timePosted={item.timePosted}
            moreD={item.moreD}
            prefPayment={item.prefPayment}
					/>
				)}
			/>
		</View>
	);
};

export default ListingList;

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		marginHorizontal: 4, //15
	},
});
