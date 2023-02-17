import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { DUMMY_DATA_RESIDENT } from "../../constants/DUMMY_DATA";
import ResidentListing from "./ResidentListing";
import Listing from "./Listing";

const ResidentListingList = ({onPress}) => {

  return (
    <View style={styles.wrapper}>
        
      <FlatList
    
        showsVerticalScrollIndicator={false}
        data={DUMMY_DATA_RESIDENT}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ResidentListing
          onPress={onPress}
            id={item.id}
            toLocation={item.toLocation}
            fromLocation={item.fromLocation}
            rating={item.rating}
            maxWeight={item.maxWeight}
            username={item.username}
            imageSrc={item.imageSrc}
            timePosted={item.timePosted}
          />
        )}
      />
    </View>
  );
};

export default ResidentListingList;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginHorizontal: 4 //15,
  },
});
