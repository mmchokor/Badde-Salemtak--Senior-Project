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
import LoadingIcon from "../Loading/LoadingIcon";

const NotificationOrderReceived = ({
  id,
  message,
  date,
  totalPrice,
  username,
  listingId,
  orderId,
  setNotification,
  senderName,
  lastName,
}) => {
  //console.log(message)
  const listingIndex = message.indexOf("listing");
  const listingName =
    listingIndex !== -1 ? message.slice(listingIndex + "listing".length) : "";

  const navigation = useNavigation();
  const diffText = timeSincePost(date);
  let messageHeader = "";

  let btnOption = false;

  const { data: token } = useQuery("token", getToken);
  //const [notification, setNotification] = useAtom(notifications)

  const { data: listing, isFetching } = useQuery(
    "listing",
    () => getResidentListingById(listingId),
    { enabled: !!token }
  );

  const handleDelete = useMutation((itemId) => deleteNotification(itemId), {
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

  // if (isFetching) {
  //   return <LoadingIcon />;
  // }

  // console.log(listingId)

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

  if (message.includes("money")) {
    messageHeader = "Order has been delivered!";
  } else if (message.includes("paid")) {
    messageHeader = "Time to deliver!";
  } else if (message.includes("listing")) {
    messageHeader = "You have received an offer!";
    //setBtnOption(true);
    btnOption = true;
  }

  return (
    <View>
      <View style={styles.cardWrapper}>
        <View style={styles.contentWrapper}>
          <Text style={styles.header}>
            {/* You received an offer on your listing! */}
            {/* {message} */}
            {messageHeader}
          </Text>
          <Text style={styles.textMessage}>
            {/* The sender
            <Text style={styles.username}> {senderName + " " + lastName} </Text>
            has sent you an order for the listing
            <Text style={styles.username}>{listingName}</Text> */}
            {message}
          </Text>
        </View>
        <View style={styles.buttonDateWrapper}>
          {btnOption && (
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
          )}
          {!btnOption && (
            <View style={styles.buttonWrapper}>
              <Pressable
                style={[styles.button, styles.buttonAccept]}
                onPress={declineHandler}
              >
                <Text style={[styles.text, styles.textAccept]}>Delete</Text>
              </Pressable>
            </View>
          )}
          <Text style={styles.timeReceived}>{diffText}</Text>
        </View>
      </View>
    </View>
  );
};

export default NotificationOrderReceived;

const styles = StyleSheet.create({
  cardWrapper: {
    //flexDirection: "row",
    //alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
  header: {
    fontFamily: "inter-medium",
    fontSize: 17,
  },

  timeReceived: {
    fontSize: 12,
    color: Colors.lightGray,
    alignSelf: "flex-end",
  },
  username: {
    fontFamily: "inter-medium",
    color: Colors.darkGreen,
    opacity: 0,
  },
  buttonWrapper: {
    flexDirection: "row",
    marginTop: 5,
  },
  button: {
    padding: 6,
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
  textMessage: {
    //width: '100%',
    fontFamily: "inter-regular",
    fontSize: 13,
    marginVertical: 5,
    color: Colors.gray,
    //flexWrap: 'wrap'
  },
  buttonDateWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    
  },
});
