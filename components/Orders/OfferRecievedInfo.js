import { StyleSheet, Text, View } from "react-native";
import React from "react";

const OfferRecievedInfo = () => {
  return (
    <View>
      <View style={styles.textBlock}>
        <Text style={styles.blockLight}>Delivery Date:</Text>
        <Text style={styles.blockDark}>April 5 2023</Text>
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.blockLight}>Extra fees added by traveler:</Text>
        <Text style={styles.blockDark}>$10</Text>
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.blockLight}>Message from traveler:</Text>
        <Text style={styles.blockDark}>
          The price of the item has changed since the time you posted that’s why
          I added the extra $10
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
