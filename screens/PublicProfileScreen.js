import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useLayoutEffect, useRef, useMemo, useState, useCallback } from "react";
import { Colors } from "../constants/colors";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ListingList from "../components/Item/ListingList";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

const PublicProfileScreen = ({ navigation }) => {
  const [darkBackDrop, setDarkBackDrop] = useState(false);
  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ["50%", "70%"], []);

  const optionsHandler = () => {
    bottomSheetModalRef.current?.present();
    setDarkBackDrop(true);
  };

  const closeBottomSheet = () => {
    bottomSheetModalRef.current?.close();
    setDarkBackDrop(false);
  };

  const settingsHandler = () => {
    navigation.navigate("Home", { screen: "Profile" });
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


  return (
    <BottomSheetModalProvider>
      <Pressable
        onPress={closeBottomSheet}
        //style={darkBackDrop && animatedStyle}
      >
        <View
          style={{
            backgroundColor: Colors.darkGreen,
            height: 40,
          }}
        >
          <View style={styles.circle}>
            <Text>R.S</Text>
          </View>
        </View>

          {/* The name is here and the user info are here */}
        <View>
          <Text style={styles.name}>Rami El Skakini</Text>
        </View>
        <View style={styles.userInfoWrapper}>
          <Text style={styles.text}>
            <Feather name="flag" size={12} color="black" />
            Lebanon
          </Text>
          <Text style={[styles.text, styles.date]}>
            <Feather name="calendar" size={14} color="black" /> March 2023
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
      </Pressable>
      
      {/* Here is the bottom sheet Modal when the options is clicked */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onDismiss={() => setDarkBackDrop(false)}
      >
        <View style={{ flex: 1 }}>
          <Pressable onPress={({ pressed }) => pressed && { opacity: 0.5 }}>
            <AntDesign
              onPress={closeBottomSheet}
              name="close"
              size={30}
              color="black"
              style={{ marginRight: 20, alignSelf: "flex-end" }}
            />
          </Pressable>
          <View>
            <Pressable
              style={({ pressed }) =>
                pressed
                  ? [styles.bottomSheetCardWrapper, { opacity: 0.5 }]
                  : styles.bottomSheetCardWrapper
              }
              onPress={settingsHandler}
            >
              <Ionicons name="settings-outline" size={24} color="black" />
              <Text style={styles.bottomSheetText}> Profile Settings</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) =>
                pressed
                  ? [styles.bottomSheetCardWrapper, { opacity: 0.5 }]
                  : styles.bottomSheetCardWrapper
              }
            >
              <Ionicons name="airplane-outline" size={24} color="black" />
              <Text style={styles.bottomSheetText}> My orders</Text>
            </Pressable>
          </View>
        </View>
      </BottomSheetModal>

      {/* This is where all the listings are rendered */}
      <View style={[{ flex: 1 }]}>
        <ListingList />
      </View>
    </BottomSheetModalProvider>
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
