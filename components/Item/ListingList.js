import { useNavigation } from '@react-navigation/native'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useQuery } from 'react-query'
import { DUMMY_DATA } from '../../constants/DUMMY_DATA'
import Listing from './Listing'

const ListingList = () => {
   const navigation = useNavigation()

   // i want use React query to get data from my server
   const { status, data: residentListings, isError, error, isLoading } = useQuery(
      'traverlerLisitngs',
      async () => {
         const response = await fetch(
            'https://badde-salemtak-api.vercel.app/api/resident/',
            {
               headers: {
                  Authorization:
                     'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTI5M2M3NWJhOGQyYWIxZjFjNjgyMCIsImlhdCI6MTY3NTc5MzQxMiwiZXhwIjoxNjc4Mzg1NDEyfQ.xeDDusb55YcGcIlSFR5UA0QGYE9PUrCZeSOI4vPay_E',
               },
            }
         )
         const data = await response.json()
         return data.data.residentListings
      }
   )

   if (isLoading) {
      return <Text>Loading...</Text>
   }

   if (isError) {
      return <Text>{error.message}</Text>
   }

   return (
      <View style={styles.wrapper}>
         <FlatList
            showsVerticalScrollIndicator={false}
            data={residentListings}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
               <Listing
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
                  id={item._id}
                  title={item.name}
                  location={item.cityOfResidence}
                  rating={4}
                  type={item.productType}
                  price={item.price}
                  quantity={item.quantity}
                  weight={item.approximateWeight}
                  username={item.user}
                  imageSrc={item.imageCover}
                  timePosted={item.createdAt}
                  moreD={item.description}
                  prefPayment={item.paymentMethod}
               />
            )}
         />
      </View>
   )
}

export default ListingList

const styles = StyleSheet.create({
   wrapper: {
      flex: 1,
      marginHorizontal: 4, //15
   },
})
