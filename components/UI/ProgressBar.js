import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MyText from "./MyText";
import { Colors } from "../../constants/colors";

const ProgressBar = ({one,two,three}) => {
  return (
    <View style={styles.circleWrapper}>
      <View style={one ? [styles.circle, styles.circleOne] : styles.circle}></View>
      <View style={two ? [styles.circle, styles.circleTwo] : styles.circle}></View>
      <View style={three ? [styles.circle, styles.circleThree] : styles.circle}></View>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  circleWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10
  },
  circle: {
    height: 12,
    width: 12,
    borderRadius: 12 / 2,
    borderWidth: 1,
    marginHorizontal: 5,
    //borderColor: "#FFC000",
    borderColor: '#60B177'
  },
  circleOne: {
    borderColor: Colors.white,
    backgroundColor: Colors.white,
  },
  circleTwo: {
    borderColor: Colors.white,
    backgroundColor: Colors.white,
  },
  circleThree: {
    borderColor: Colors.white,
    backgroundColor: Colors.white,
  },
});
