import { StyleSheet, Text, View } from "react-native";
import React from "react";
import OfferRecievedInfo from "./OfferRecievedInfo";
import OfferReceivedPriceSummary from "./OfferReceivedPriceSummary";
import { formatDate } from "../../constants/FormatDate";
import Button from "../UI/Button";
import {confirmOrderDelivered} from "../../api/orderAPI";
import { useQuery, useMutation } from "react-query";
const RenderOrderDetails = ({ route }) => {
  const deliveryFee = route.params.deliveryFee;
  const date = route.params.date;
  const message = route.params.message;
  const price = route.params.price;
  const orderId = route.params.orderId
  const totalPrice = price + deliveryFee + 10 + 5;


  const { mutate, error } = useMutation(confirmOrderDelivered, {
    onError: () => console.log("Error"),
  });



  const confirmDeliveryHandler = () => {
    console.log("here");
    mutate(orderId);
  };

  return (
    <View style={styles.container}>
      <OfferRecievedInfo
        extraFees={deliveryFee - 5}
        date={formatDate(date)}
        message={message}
      />
      <OfferReceivedPriceSummary
        travelerReward={10}
        subTotal={price}
        deliveryFee={deliveryFee}
        totalPrice={totalPrice}
      />

      <View style={styles.buttonWrapper}>
        <Button
          textStyle={{ fontSize: 14 }}
          styleWrapper={styles.buttonWrapper}
          style={styles.button}
          onPress={confirmDeliveryHandler}
        >
          Confirm Delivery
        </Button>
      </View>
    </View>
  );
};

export default RenderOrderDetails;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  buttonWrapper: {
    marginVertical: 20,
  },
  button: {
    width: "70%",
  },
  buttonWrapper: {
    borderRadius: 12,
  },
});
