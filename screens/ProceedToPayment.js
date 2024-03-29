import { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from "react-native";
import PreferredPaymentOrder from "../components/Orders/PreferredPaymentOrder";
import Button from "../components/UI/Button";
import { Colors } from "../constants/colors";
import { paymentM } from "../store/PaymentOrder/paymentOrder";
import { ScrollView } from "react-native-gesture-handler";
import { useMutation } from "react-query";
import { acceptOrder } from "../api/orderAPI";
import { useAtom } from "jotai";
import { isLoading } from "../store/OrderConfirmLoading/OrderConfirmLoading";
import { deleteNotification } from "../api/notificationAPI";
const height = Dimensions.get("window").height;
function ProceedToPayment({ route, navigation }) {
  const [loading, setLoading] = useAtom(isLoading);
  const {
    price,
    title,
    totalPrice,
    username,
    deliveryFee,
    orderId,
    notificationId,
  } = route.params;
  const [payment, setPayment] = useAtom(paymentM);

  const handleDelete = useMutation((notiId) => deleteNotification(notiId), {});

  const { mutate, error } = useMutation(acceptOrder, {
    onSuccess: paymentSuccessHandler,
    onError: () => console.log("Error"),
  });

  function paymentSuccessHandler() {
    setLoading(false);
    handleDelete.mutate(notificationId);
    navigation.navigate("OrderConfirmation", {
      price: price,
      title: title,
      totalPrice: totalPrice,
      username: username,
      deliveryFee: deliveryFee,
    });
  }

  const confirmPaymentHandler = () => {
    setLoading(true);
    mutate(orderId);
  };

  function screenPay(payment) {
    if (payment === 0) {
      return (
        <View>
          <Text style={styles.title}>Cash on Delivery</Text>
          <Text style={[styles.title, { color: Colors.darkGreen }]}>
            Using cash on delivery we bare no responsibility for the item or the
            money
          </Text>
        </View>
      );
    } else if (payment === 3) {
      return (
        <View>
          <Text style={styles.title}>Whish Money</Text>
          <Text style={styles.subtitle}>Send to: Rami</Text>
          <Text style={styles.subtitle}>Phone number: +961 81798314</Text>
        </View>
      );
    } else if (payment === 2) {
      return (
        <ScrollView>
          <Text style={styles.title}>Visa/Mastercard</Text>
          <Text style={styles.subtitle}>Name on Card</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { paddingLeft: 10 }]}
              placeholder="Karam Timani"
            ></TextInput>
          </View>
          <Text style={styles.subtitle}>Card Number</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { paddingLeft: 10 }]}
              placeholder="**** **** **** ****"
            ></TextInput>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View>
              <Text style={styles.subtitle}>Expiration date</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[
                    styles.input,
                    { paddingRight: 110, marginRight: 55, paddingLeft: 10 },
                  ]}
                  placeholder="MM/YY"
                ></TextInput>
              </View>
            </View>
            <View>
              <Text style={styles.subtitle}>Security Code</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[styles.input, { paddingRight: 100, paddingLeft: 10 }]}
                  placeholder="CVC"
                ></TextInput>
              </View>
            </View>
          </View>
        </ScrollView>
      );
    } else if (payment === 1) {
      return (
        <ScrollView>
          <Text style={styles.title}>Western Union</Text>
          <Text style={styles.subtitle}>Send to: Rami</Text>
          <Text style={styles.subtitle}>Phone number: +961 81798314</Text>
          {/* <Text style={[styles.subhead, { marginTop: 20 }]}>
						Note: The money will be held in escrow with us until you confirm
						that you have received the item
					</Text> */}
        </ScrollView>
      );
    } else {
      return (
        <Text style={[styles.title, { marginVertical: 50, marginTop: 50 }]}>
          Please Select a Payment Method
        </Text>
      );
    }
  }
  return (
    <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
      <Text style={styles.head}>Please choose a payment method:</Text>
      <Text style={styles.subhead}>
        Note: The money will be held in escrow with us until you confirm that
        you have received the item
      </Text>
      <View>
        <PreferredPaymentOrder />
      </View>
      <View>{screenPay(payment)}</View>
      <View style={styles.buttonWrapper}>
        {!loading && (
          <Button
            textStyle={{ fontSize: 14 }}
            styleWrapper={styles.buttonWrapper}
            style={styles.button}
            onPress={confirmPaymentHandler}
          >
            Confirm Payment
          </Button>
        )}
        {loading && (
          <Button style={styles.button}>
            <ActivityIndicator size="small" color={Colors.lightGreen} />
          </Button>
        )}
      </View>
    </ScrollView>
  );
}

export default ProceedToPayment;

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: "white",
  },
  head: {
    fontFamily: "inter-bold",
    fontSize: 15,
    marginTop: 15,
    color: Colors.black,
  },
  subhead: {
    fontFamily: "inter-light",
    fontSize: 13,
    marginTop: 2,
    opacity: 0.9,
    color: Colors.darkGreen,
  },
  title: {
    fontFamily: "inter-bold",
    fontSize: 20,
    marginTop: 10,
    color: Colors.black,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "inter-bold",
    fontSize: 15,
    marginTop: 10,
    color: Colors.black,
  },
  buttonWrapper: {
    marginVertical: 10,
    borderRadius: 12,
  },
  button: {
    width: "80%",
  },
  input: {
    backgroundColor: Colors.inputGray,
    borderRadius: 8,
    padding: height < 800 ? 4 : 6,
    marginTop: 10,
  },
});
