import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import OfferRecievedInfo from "./OfferRecievedInfo";
import OfferReceivedPriceSummary from "./OfferReceivedPriceSummary";
import { formatDate } from "../../constants/FormatDate";
import Button from "../UI/Button";
import {confirmOrderDelivered} from "../../api/orderAPI";
import { useQuery, useMutation } from "react-query";
import { useAtom } from "jotai";
import { isLoading } from "../../store/ConfirmDeliveryLoading/ConfirmDeliveryLoading";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/colors";
const RenderOrderDetails = ({ route }) => {
  const deliveryFee = route.params.deliveryFee;
  const date = route.params.date;
  const message = route.params.message;
  const price = route.params.price;
  const orderId = route.params.orderId
  const totalPrice = price + deliveryFee + 10 + 5;
  const [loading, setLoading] = useAtom(isLoading);
const navigation = useNavigation()
  

  const { mutate, error } = useMutation(confirmOrderDelivered, {
    onError: () => console.log("Error"),
    onSuccess: orderDeliveredHandler
  });

  function orderDeliveredHandler () {
    setLoading(false);
    navigation.navigate('MyOrderScreen', {load: true})
  }

  const confirmDeliveryHandler = () => {
    setLoading(true)
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
        {!loading && (<Button
          textStyle={{ fontSize: 14 }}
          styleWrapper={styles.buttonWrapper}
          style={styles.button}
          onPress={confirmDeliveryHandler}
        >
          Confirm Delivery
        </Button>)}
        {loading && (
        <Button style={styles.button}>
          <ActivityIndicator size="small" color={Colors.lightGreen} />
        </Button>
      )}
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
