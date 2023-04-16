import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/colors";
import { useAtom } from "jotai";
import { notifications } from "../../store/Notifications/notification";
import { formatDate, timeSincePost } from "../../constants/FormatDate";
import moment from "moment";
import { useQuery } from "react-query";
import { getToken } from "../../api/userAPI";
import { getResidentListingById } from "../../api/residentListingsAPI";
import { getOrderById} from "../../api/orderAPI"
import {deleteNotification} from '../../api/notificationAPI'

const NotificationOrderReceived = ({
  image,
  price,
  title,
  location,
  id,
  message,
  date,
  totalPrice,
  username,
  listingId,
  orderId
}) => {

//console.log(listingId)

  const { data: token } = useQuery("token", getToken);


  
  const { data: listing } = useQuery(
    "listing", () =>
    getResidentListingById(token, listingId),
    { enabled: !!token }
  );

  //console.log(listing)

  const {data: order} = useQuery("order", () => getOrderById(orderId))

  //console.log("order response", order.message)

  //console.log(listing)

  // i need the image, the price, the title,, the location from the listingID

  const [notification, setNotification] = useAtom(notifications);
  const navigation = useNavigation();

  const formattedDate = formatDate(date);

  const diffText = timeSincePost(date);

  const viewOfferHandler = () => {
    navigation.navigate("Home", {
      screen: "offerRecieved",
      params: {
        image: listing.images[0],
        price: listing.price,
        title: listing.name,
        location: listing.cityOfResidence,
        // formattedDate: formatDate(order.date),
        // message: order.message,
        totalPrice,
        username,
        orderId,
        listingId,
        id
      },
    });
  };

  const declineHandler = async () => {
    try {
      const deleted = await deleteNotification(id)
    }
    catch (err) {
      console.log(err);
      throw new Error('failed to delete')
    }
    
  };

  return (
    <View>
      <View style={styles.cardWrapper}>
        <View style={styles.profileImg}></View>
        <View style={styles.contentWrapper}>
          <Text style={styles.text}>
            {message}
            <Text style={styles.username}> Rami ElSkakini!</Text>
          </Text>
          <Text style={styles.timeReceived}>{diffText}</Text>
          <View style={styles.buttonWrapper}>
            <Pressable
              style={[styles.button, styles.buttonAccept]}
              onPress={viewOfferHandler}
            >
              <Text style={[styles.text, styles.textAccept]}>View Offer</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={declineHandler}>
              <Text style={styles.text}>Decline</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NotificationOrderReceived;

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  contentWrapper: {
    marginLeft: 10,
  },
  profileImg: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGreen,
    marginRight: 2,
  },
  timeReceived: {
    fontSize: 12,
    color: Colors.lightGray,
  },
  username: {
    fontFamily: "inter-bold",
    color: Colors.darkGreen,
  },
  buttonWrapper: {
    flexDirection: "row",
    marginTop: 10,
  },
  button: {
    padding: 8,
    borderRadius: 6,
    borderColor: Colors.lightGray,
    borderWidth: 1,
    marginRight: 5,
  },
  buttonAccept: {
    backgroundColor: Colors.darkGreen,
  },
  text: {
    fontSize: 14,
  },
  textAccept: {
    color: Colors.white,
  },
});
