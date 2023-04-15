import { StyleSheet, Text, View, Pressable } from "react-native";
import ResidentListingList from "../components/Item/ResidentListingList";
import { useFocusEffect } from '@react-navigation/native';
import {useState,useCallback} from 'react';
function ResidentScreen() {
 

  return (
    <View style={styles.container}>
      <ResidentListingList />
    </View>
  );
}
export default ResidentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
