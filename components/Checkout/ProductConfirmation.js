import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import MyText from "../UI/MyText";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

const ProductConfirmation = () => {
  return (
    <SafeAreaView>
      {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Ionicons
          name="arrow-back"
          size={24}
          color={Colors.darkGreen}
          style={styles.icon}
        />
        <MyText style={styles.header}>Your Cart</MyText>
        <Ionicons
          name="arrow-back"
          size={24}
          color={Colors.white}
          style={styles.icon}
        />
      </View> */}
    </SafeAreaView>
  );
};

export default ProductConfirmation;

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    fontSize: 20,
    
  },
//   icon: {
//     position: "absolute",
//   },
});
