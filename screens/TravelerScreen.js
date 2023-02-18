import { useNavigation } from '@react-navigation/native'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import ListingList from '../components/Item/ListingList.js'
import { Colors } from '../constants/colors'
function TravelerScreen() {
   const navigation = useNavigation()

   function PressEventHandler() {
      navigation.navigate('Resident')
   }
   // function navigateToItemDetails(){
   //   navigation.navigate("ItemDetails",{id:""});
   // }

   return (
      <View style={styles.container}>
         <View style={{ alignItems: 'center' }}>
            <View style={styles.upperButton}>
               <View style={styles.traveler}>
                  <Text style={styles.textT}>Traveler</Text>
               </View>
               <Pressable onPress={PressEventHandler}>
                  <View style={styles.resident}>
                     <Text style={styles.textR}>Resident</Text>
                  </View>
               </Pressable>
            </View>
         </View>
         <ListingList />
      </View>
   )
}
export default TravelerScreen

const styles = StyleSheet.create({
   upperButton: {
      margin: 5,
      width: 190,
      height: 60,
      backgroundColor: Colors.darkGreen,
      borderRadius: 30,
      alignItems: 'center',
      alignContent: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   traveler: {
      backgroundColor: Colors.white,
      padding: 15,
      marginLeft: 7,
      color: Colors.white,
      borderRadius: 30,
   },
   resident: {
      padding: 15,
      borderRadius: 30,
      marginRight: 7,
      borderRadius: 30,
   },
   textT: {
      fontFamily: 'inter-regular',
      color: Colors.black,
   },
   textR: {
      color: Colors.white,
      fontFamily: 'inter-regular',
   },
   container: {
      flex: 1,
   },
   itemWrapper: {
      margin: 5,
      flex: 1,
   },
})
