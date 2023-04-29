import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Colors } from "../../constants/colors";

const CustomTapBar = ({ state, navigation }) => {
  const residentScreenHandler = () => {
    navigation.navigate("Residentt");
  };
  const travelerScreenHandler = () => {
    navigation.navigate("Travelerr");
  };

  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.upperButton}>
        <Pressable
          style={
            state.index == 0
              ? [styles.traveler, styles.travelerActive]
              : styles.traveler
          }
          onPress={travelerScreenHandler}
        >
          <Text style={state.index == 0 ? styles.textT : styles.textR}>
            Traveler
          </Text>
        </Pressable>

        <Pressable
          style={
            state.index == 0
              ? styles.resident
              : [styles.resident, styles.residentActive]
          }
          onPress={residentScreenHandler}
        >
          <Text style={state.index == 0 ? styles.textR : styles.textT}>
            Resident
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CustomTapBar;

const styles = StyleSheet.create({
  upperButton: {
    margin: 5,
    width: 190,
    height: 60,
    backgroundColor: Colors.darkGreen,
    borderRadius: 30,
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  traveler: {
    padding: 15,
    marginLeft: 7,
    color: Colors.white,
    borderRadius: 30,
  },
  travelerActive: {
    backgroundColor: Colors.white,
  },
  resident: {
    padding: 15,
    // borderRadius: 30,
    marginRight: 7,
    // borderRadius: 30,
  },
  residentActive: {
    backgroundColor: Colors.white,
    borderRadius: 30,
  },
  textT: {
    fontFamily: "inter-regular",
    color: Colors.black,
  },
  textR: {
    color: Colors.white,
    fontFamily: "inter-regular",
  },
});
