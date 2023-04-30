import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useLayoutEffect } from "react";
import { Colors } from "../constants/colors";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ListingList from "../components/Item/ListingList";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { getCurrentUser } from "../api/userAPI";
import { useQuery } from "react-query";

import ProfileListingList from "../components/Profile/ProfileListingList";
import LoadingIcon from "../components/Loading/LoadingIcon";
import { getUserInfoById } from "../api/userAPI";
import { formatDate } from "../constants/FormatDate";

const PublicProfileScreenUser = ({ navigation, route }) => {
  const username = route.params?.username;
  const userId = route.params?.userId;


  const optionsHandler = () => {
    console.log("reported");
  };


  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <SimpleLineIcons
            onPress={optionsHandler}
            style={({ pressed }) =>
              pressed ? { opacity: 0.5, marginRight: 10 } : { marginRight: 10 }
            }
            name="options-vertical"
            size={24}
            color={Colors.white}
          />
        );
      },
    });
  }, []);

  const { data: userInfo, isFetching } = useQuery("userInfo", () => getUserInfoById(userId));

  if (isFetching) {
    return <LoadingIcon />;
  }


  const profileImgText =
  userInfo.firstname.charAt(0).toUpperCase() +
    "." +
    userInfo.lastname.charAt(0).toUpperCase();

  //const profileImgText = "H"

  return (
    <View style={{flex: 1}}>
      <View
      >
        <View
          style={{
            backgroundColor: Colors.darkGreen,
            height: 40,
          }}
        >
          <View style={styles.circle}>
            <Text>{profileImgText}</Text>
          </View>
        </View>

        {/* The name is here and the user info are here */}
        <View>
          <Text style={styles.name}>
            {/* {userInfo.firstname + " " + userInfo.lastname} */}
            {username}
          </Text>
        </View>
        <View style={styles.userInfoWrapper}>
          <Text style={styles.text}>
            <Feather name="flag" size={12} color="black" />
            {userInfo.country}
          </Text>
          <Text style={[styles.text, styles.date]}>
            <Feather name="calendar" size={14} color="black" /> {formatDate(userInfo.createdAt)}
          </Text>
        </View>

        {/* The three buttons to message the user etc */}
        <View style={styles.infoWrapper}>
          <View style={styles.iconTextWrapper}>
            <EvilIcons name="star" size={20} color="black" />
            <Text>4.5</Text>
          </View>
          <View style={styles.iconTextWrapper}>
            <MaterialCommunityIcons
              name="message-processing-outline"
              size={14}
              color="black"
            />
            <Text style={styles.iconText}>Message</Text>
          </View>
          <View style={styles.iconTextWrapper}>
            <Ionicons name="md-people-outline" size={17} color="black" />
            <Text style={styles.iconText}>40</Text>
          </View>
        </View>
        <Text style={styles.subheader}>Listings</Text>
      </View>

      {/* This is where all the listings are rendered */}
      <View style={[{ flex: 1 }]}>
        <ProfileListingList userIdProps = {userId} />
      </View>
    </View>
  );
};

export default PublicProfileScreenUser;

const styles = StyleSheet.create({
  circle: {
    height: 70,
    width: 70,
    borderRadius: 35,
    borderWidth: 1,
    backgroundColor: Colors.profileImgColor,
    alignSelf: "center",
    //position: 'absolute',
    top: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
  },
  userInfoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  text: {
    marginHorizontal: 15,
  },
  date: {
    opacity: 0.5,
  },
  infoWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  subheader: {
    textAlign: "center",
    marginVertical: 25,
    fontSize: 20,
  },
  bottomSheetCardWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginVertical: 10,
  },
  bottomSheetText: {
    fontSize: 18,
  },
  iconTextWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconText: {
    marginLeft: 3,
  },
});
