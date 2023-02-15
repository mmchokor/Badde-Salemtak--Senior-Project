import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import Listing from "./Listing";
import { DUMMY_DATA } from "../../constants/DUMMY_DATA";

const ListingList = ({onPress}) => {
  return (
    <View style={styles.wrapper}>
      <FlatList
    
        showsVerticalScrollIndicator={false}
        data={DUMMY_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Listing
          onPress={onPress}
            id={item.id}
            title={item.title}
            location={item.location}
            rating={item.rating}
            type={item.type}
            price={item.price}
            username={item.username}
            imageSrc={item.imageSrc}
            timePosted={item.timePosted}
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
    marginHorizontal: 4 //15
  },
});
