import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../constants/colors";
import SignUpDetails from "../components/SignUp/SignUpDetails";

const SignupDetailsScreen = () => {
  return (
    <View style={styles.wrapper}>
      <SignUpDetails />
    </View>
  );
};

export default SignupDetailsScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
