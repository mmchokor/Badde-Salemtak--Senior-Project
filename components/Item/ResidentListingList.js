import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { DUMMY_DATA_RESIDENT } from '../../constants/DUMMY_DATA'
import Listing from './Listing'
import ResidentListing from './ResidentListing'
const ResidentListingList = () => {
   const navigation = useNavigation()
   return (
      <View style={styles.wrapper}>
         <FlatList
            showsVerticalScrollIndicator={false}
            data={DUMMY_DATA_RESIDENT}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
               <ResidentListing
                  onPress={() =>
                     navigation.navigate('LocationDetails', {
                        id: item.id,
                        toLocation: item.toLocation,
                        fromLocation: item.fromLocation,
                        rating: item.rating,
                        maxWeight: item.maxWeight,
                        username: item.username,
                        imageSrc: item.imageSrc,
                        timePosted: item.timePosted,
                        userLocation: item.userLocation,
                        prefPayment: item.prefPayment,
                        moreD: item.moreD,
                        type: item.type,
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
                  userLocation={item.userLocation}
                  prefPayment={item.prefPayment}
                  moreD={item.moreD}
                  type={item.type}
               />
            )}
         />
      </View>
   )
}

export default ResidentListingList

const styles = StyleSheet.create({
   wrapper: {
      flex: 1,
      marginHorizontal: 4, //15,
   },
})
