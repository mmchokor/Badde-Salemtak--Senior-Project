import {
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from "react-native";
import { Colors } from "../constants/colors";
import NotificationOrderReceived from "../components/Notifications/NotificationOrderReceived";
import { useAtom } from "jotai";
import { notifications } from "../store/Notifications/notification";
import { getNotifications } from "../api/notificationAPI";
import { getCurrentUser } from "../api/userAPI";
import { useQuery } from "react-query";
import { getResidentListingById } from "../api/residentListingsAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingIcon from "../components/Loading/LoadingIcon";
import { useState } from "react";
import { set } from "react-native-reanimated";
import { useEffect } from "react";

async function getToken() {
  try {
    const token = await AsyncStorage.getItem("token");

    return token;
  } catch (err) {
    console.log(err);
  }
}

function NotificationsScreen({ navigation, route }) {
  //const [notification, setNotification] = useAtom(notifications);
  const [notification, setNotification] = useState([]);

  const {
    data: Notifications,
    isError,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useQuery("Notifications", getNotifications, {
    //staleTime: 1,
    onSuccess: (data) => {
      
      //console.log(data.data.userNotifications)
      setNotification(data.data.userNotifications);
    },
    onError: (error) => {
      console.log(error)
    }
  });

  if (isFetching || isLoading) {
    return <LoadingIcon />;
  }

  if (isError) {
    return <Text>{error.message}</Text>;
  }


  return (
    <View style={{ flex: 1 }}>
      <FlatList
        refreshing={isFetching}
        onRefresh={() => refetch()}
        //data={Notifications.data.userNotifications}
        data={notification}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <NotificationOrderReceived
            key={item._id}
            message={item.message}
            date={item.date}
            orderId={item.order.id}
            senderName={item.sender.firstname}
            listingId={item.order.listing}
            id={item._id}
            setNotification={setNotification}
            lastName={item.sender.lastname}
          />
        )}
      />
    </View>
  );
}

export default NotificationsScreen;

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
