import { StyleSheet, Text, View } from "react-native";
import React from "react";
import StraightLine from "../UI/StraightLine";
import { Colors } from "../../constants/colors";

const OfferReceivedPriceSummary = ({travelerReward = 10, deliveryFee, subTotal, totalPrice}) => {
  return (
    <View>
    <View>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryHeader}>Subtotal:</Text>
        <Text style={styles.summaryPrice}>${subTotal}</Text>
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryHeader}>Delivery fee:</Text>
        <Text style={styles.summaryPrice}>${+deliveryFee}</Text>
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryHeader}>Service fee:</Text>
        <Text style={styles.summaryPrice}>$5</Text>
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryHeader}>Traveler reward:</Text>
        <Text style={styles.summaryPrice}>${travelerReward}</Text>
      </View>
      </View>
      <StraightLine />
      <View style={styles.totalContainer}>
          <Text style={styles.totalPrice}>Total:</Text>
          <Text
            style={[
              styles.totalPrice,
              { color: Colors.darkGreen, fontFamily: "inter-bold" },
            ]}
          >
            {/* ${+travelerReward + +subTotal + 5 + +deliveryFee} */}
            {/* ${price} */}
            ${totalPrice}
          </Text>
        </View>
    </View>
  );
};

export default OfferReceivedPriceSummary;

const styles = StyleSheet.create({
    summaryContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
      },
      summaryHeader: {
        color: "#C8C8C8",
      },
      summaryPrice: {
        fontFamily: "inter-medium",
      },

      totalContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
      },
      totalHeader: {
        color: "#C8C8C8",
      },
      totalPrice: {
        fontFamily: "inter-medium",
      },
});
