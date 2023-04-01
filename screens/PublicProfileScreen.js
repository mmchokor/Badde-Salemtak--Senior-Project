import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { Colors } from "../constants/colors";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ListingList from "../components/Item/ListingList";
import { SimpleLineIcons } from '@expo/vector-icons';

const PublicProfileScreen = ({ navigation }) => {

    const optionsHandler = () => {
        console.log('clicked')
    }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <SimpleLineIcons
            onPress={optionsHandler}
            style={{ marginRight: 10 }}
            name="options-vertical"
            size={24}
            color={Colors.white}
          />
        );
      },
    });
  }, []);

  return (
    <View>
      <View
        style={{
          backgroundColor: Colors.darkGreen,
          height: 40,
          //position: "relative",
        }}
      >
        <View style={styles.circle}>
          <Text>R.S</Text>
        </View>
      </View>

      <View>
        <Text style={styles.name}>Rami El Skakini</Text>
      </View>
      <View style={styles.dateWrapper}>
        <Text style={styles.text}>
          <Feather name="flag" size={12} color="black" />
          Lebanon
        </Text>
        <Text style={[styles.text, styles.date]}>
          <Feather name="calendar" size={14} color="black" /> March 2023
        </Text>
      </View>
      <View style={styles.infoWrapper}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <EvilIcons name="star" size={20} color="black" />
          <Text>4.5</Text>
        </View>

        <Text>
          <MaterialCommunityIcons
            name="message-processing-outline"
            size={14}
            color="black"
          />
          Message
        </Text>
        <Text>
          <Ionicons name="md-people-outline" size={17} color="black" />
          40
        </Text>
      </View>
      <Text style={styles.subheader}>Listings</Text>
      <ListingList />
    </View>
  );
};

export default PublicProfileScreen;

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
  dateWrapper: {
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
    marginTop: 25,
    fontSize: 20,
  },
});
