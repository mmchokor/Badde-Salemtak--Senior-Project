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
import { getOrderById } from "../../api/orderAPI";
import { deleteNotification } from "../../api/notificationAPI";
import { useMutation } from "react-query";

const NotificationOrderReceived = ({
  id,
  message,
  date,
  totalPrice,
  username,
  listingId,
  orderId,
  setNotification
}) => {
  const { data: token } = useQuery("token", getToken);
  //const [notification, setNotification] = useAtom(notifications)

  const { data: listing } = useQuery(
    "listing",
    () => getResidentListingById(token, listingId),
    { enabled: !!token }
  );


  const navigation = useNavigation();
  const diffText = timeSincePost(date);

  const viewOfferHandler = () => {
    navigation.navigate("Home", {
      screen: "offerRecieved",
      params: {
        image: listing.images[0],
        price: listing.price,
        title: listing.name,
        location: listing.cityOfResidence,
        totalPrice,
        username,
        orderId,
        listingId,
        id,
      },
    });
  };


  const handleDelete = useMutation(itemId => deleteNotification(itemId), {
    onSuccess: () => {
      // Invalidate the query for the deleted item to remove it from the cache
      //queryClient.invalidateQueries('items');
      setNotification((prev) => {
        return prev.filter((noti) => noti._id !== id);
      });
    },
  });

  const declineHandler = () => {
    // Call the mutation function to delete the item
    handleDelete.mutate(id);
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
