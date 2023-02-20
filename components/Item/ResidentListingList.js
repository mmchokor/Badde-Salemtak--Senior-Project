import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { DUMMY_DATA_RESIDENT } from "../../constants/DUMMY_DATA";
import ResidentListing from "./ResidentListing";
import Listing from "./Listing";
import { useNavigation } from '@react-navigation/native'
const ResidentListingList = () => {
  const navigation=useNavigation();
  return (
   
    <View style={styles.wrapper}>
        
      <FlatList
    
        showsVerticalScrollIndicator={false}
        data={DUMMY_DATA_RESIDENT}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ResidentListing
          onPress={() =>
                     navigation.navigate('ItemDetails', {
                        id: item._id,
                        title: item.name,
                        location: item.cityOfResidence,
                        rating: 4,
                        type: item.productType,
                        price: item.price,
                        quantity: item.quantity,
                        weight: item.approximateWeight,
                        username: item.user,
                        imageSrc: item.imageCover,
                        timePosted: item.createdAt,
                        moreD: item.description,
                        prefPayment: item.paymentMethod,
                     })
                  }
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
