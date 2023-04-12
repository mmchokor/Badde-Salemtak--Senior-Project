import { StyleSheet, Text, View } from "react-native";
import ListingList from "../components/Item/ListingList.js";
import Toast from "react-native-toast-message";
import { useEffect } from "react";

function TravelerScreen({ route }) {
  
  

  useEffect(() => {
    const loading = route.params?.load;
    {loading &&
      Toast.show({
        type: "success",
        text1: "Hello",
        text2: "This is some something 👋",
      })}
  }, [route])


  return (
    <View style={styles.container}>
      {/* {loading &&
        Toast.show({
          type: "success",
          text1: "Hello",
          text2: "This is some something 👋",
        })} */}
      <ListingList />
    </View>
  );
}
export default TravelerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
