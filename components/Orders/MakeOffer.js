import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { Colors } from "../../constants/colors";
import { Entypo } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { TextInput } from "react-native-gesture-handler";
import OfferReceivedPriceSummary from "./OfferReceivedPriceSummary";
import Button from "../UI/Button";
import OrderHeader from "./OrderHeader";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Checkoutbtn from "../UI/Checkoutbtn";
import StraightLine from "../UI/StraightLine";
import { useAtom } from "jotai";
import { notifications } from "../../store/Notifications/notification";
import { createOrder } from '../../api/orderAPI'
const height = Dimensions.get("window").height;

const MakeOffer = ({ route, navigation }) => {
  const listingId = route.params.listingId
  const image = route.params.image;
  const price = route.params.price;
  const title = route.params.title;
  const location = route.params.location;
  const username=route.params.username;
  const [isChecked, setChecked] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDateIsEmpty, setSelectedDateIsEmpty] = useState(false);
  const [message, setMessage] = useState("");
  const [deliveryFee, setDeliveryFee] = useState("5");
  const [notification, setNotification] = useAtom(notifications);

  const { mutate, error } = useMutation(createOrder, {
    // onSuccess: onSuccessHandler,
    // onError: onErrorHandler,
  });

  const totalPrice = +price + 5 + +deliveryFee + 10;

  const extraFeesPriceHandler = (input) => {
    setDeliveryFee(+input + 5);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const today = new Date(date);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[today.getMonth()];
    const day = today.getDate();
    const year = today.getFullYear();

    setSelectedDate([month, day, year].join(" "));
    setSelectedDateIsEmpty(false)
    hideDatePicker();
  };

  const messageInputHandler = (message) => {
    setMessage(message);
  };

  const submitOfferHandler = () => {
    const orderSummary = {
      listingId,
      id: Math.random() + new Date(),
      subTotal: price,
      deliveryFee,
      serviceFee: 5,
      totalPrice,
      image,
      price,
      title,
      location,
      message,
      selectedDate,
      username,
    };

    if (selectedDate === "") {
      setSelectedDateIsEmpty(true);
    } else {

     

      const createOrderData = {
        listing: listingId,
        serviceFee: orderSummary.serviceFee,
        deliveryFee: orderSummary.deliveryFee,
        date: new Date(orderSummary.selectedDate).toISOString(),
        message: orderSummary.message
      }

      console.log(createOrderData)

      //setNotification((prev) => [orderSummary, ...prev]);
      // const bottomBarNav = navigation.getParent("bottomTab");
      // bottomBarNav.navigate("Notifications", { image, price, title, location });
      mutate(createOrderData)
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.wrapper}>
        <Image
          style={styles.image}
          source={{ uri: image }}
        />
        {/* {Order header includes the title of item and location} */}
        <OrderHeader title={title} location={location} />

        {/* {Checkbox with its toggle input} */}
        <View style={styles.checkboxWrapper}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
          />
          <Text style={styles.checkboxText}>Add shipping and custom fees</Text>
        </View>
        {isChecked && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 8,
            }}
          >
            <Text style={{ fontSize: 18 }}>$ </Text>
            <TextInput
              keyboardType="numeric"
              style={[styles.input, { width: "30%", padding: 2, marginTop: 0 }]}
              onChangeText={extraFeesPriceHandler}
            ></TextInput>
          </View>
        )}

        <View style={styles.inputWrapper}>
          <Text style={styles.inputText}>
            Please confirm your delivery date
            <Entypo name="calendar" size={16} color="black" />
          </Text>

          <Pressable
            style={[
              styles.datePickerButton,
              selectedDateIsEmpty && styles.datePickerButtonEmpty
            ]}
            onPress={showDatePicker}
          >
            <Text style={styles.datePickerText}>
              {selectedDate === "" ? "Select Date" : selectedDate}
            </Text>
          </Pressable>

          <DateTimePickerModal
            minimumDate={new Date()}
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputText}>Add a message</Text>
          <TextInput
            style={styles.input}
            onChangeText={messageInputHandler}
          ></TextInput>
        </View>

        <OfferReceivedPriceSummary
          subTotal={price}
          deliveryFee={deliveryFee}
          totalPrice={totalPrice}
        />

        <View style={styles.buttonWrapper}>
          <Button
            textStyle={{ fontSize: 14 }}
            styleWrapper={styles.buttonWrapper}
            style={styles.button}
            onPress={submitOfferHandler}
          >
            Submit Offer
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default MakeOffer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#EDEEF1',
  },
  wrapper: {
    //marginTop: height < 800 ? 80 : 100,
    marginHorizontal: 10,
  },
  image: {
    height: 150,
    width: 150,
    alignSelf: "center",
  },

  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  checkbox: {
    marginRight: 8,
    height: 20,
    width: 20,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  checkboxText: {
    fontFamily: "inter-regular",
    fontSize: 14,
  },
  inputText: {
    fontFamily: "inter-bold",
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    backgroundColor: Colors.inputGray,
    borderRadius: 8,
    padding: height < 800 ? 4 : 6,
    //marginTop: 10,
  },

  buttonWrapper: {
    marginVertical: 10,
    borderRadius: 12,
  },
  button: {
    width: "80%",
  },
  datePickerButton: {
    backgroundColor: Colors.inputGray,
    padding: 8,
    borderRadius: 8,
    flex: 1,
  },
  datePickerButtonEmpty: {
    backgroundColor: Colors.errorRedLight,
    borderColor: Colors.errorRedDark,
    borderWidth: 1,
  },
  datePickerText: {
    textAlign: "center",
  },
});
