import { StyleSheet, Text, View } from "react-native";
import ListingList from "../components/Item/ListingList.js";

function TravelerScreen() {
  return (
    <View style={styles.container}>
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
