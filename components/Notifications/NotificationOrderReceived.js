import {Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../constants/colors'
import { useAtom } from "jotai";
import { notifications } from '../../store/Notifications/notification';


const NotificationOrderReceived = ({image, price, title, location, id, message, date, totalPrice}) => {
    const [notification, setNotification] = useAtom(notifications);
    const navigation = useNavigation();
    
    const viewOfferHandler = () => {
        navigation.navigate("Home", {
          screen: "offerRecieved",
          params: { image, price, title, location, date, message, totalPrice },
        });
      };

    const declineHandler = () => {

        setNotification(notification.filter((item) => item.id !== id))
    }

  return (
    <View>
      <View style={styles.cardWrapper}>
        <View style={styles.profileImg}></View>
        <View style={styles.contentWrapper}>
          <Text style={styles.text}>
            You have received an offer from
            <Text style={styles.username}> Rami ElSkakini!</Text>
          </Text>
          <Text style={styles.timeReceived}>5 min ago</Text>
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
  )
}

export default NotificationOrderReceived

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
})