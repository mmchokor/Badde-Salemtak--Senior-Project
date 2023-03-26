import { StyleSheet, Text, View } from "react-native";
import React from "react";

const OfferRecievedInfo = ({date, message}) => {
  return (
    <View>
      <View style={styles.textBlock}>
        <Text style={styles.blockLight}>Delivery Date:</Text>
        <Text style={styles.blockDark}>{date}</Text>
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.blockLight}>Extra fees added by traveler:</Text>
        <Text style={styles.blockDark}>$10</Text>
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.blockLight}>Message from traveler:</Text>
        <Text style={styles.blockDark}>
          {message == '' ? "No message" : message}
        </Text>
      </View>
    </View>
  );
};

export default OfferRecievedInfo;

const styles = StyleSheet.create({
  textBlock: {
    marginBottom: 20,
  },
  blockLight: {
    color: "#C8C8C8",
  },
  blockDark: {
    fontFamily: "inter-medium",
    marginTop: 5,
  },
});
