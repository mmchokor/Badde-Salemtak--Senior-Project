import { StyleSheet, View } from "react-native";
import React from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import MyText from "../UI/MyText";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../../constants/colors";
import { SimpleLineIcons } from "@expo/vector-icons";

const SignUpDetails = () => {
  return (
    <View style={styles.container}>
      <StatusBar status="dark"></StatusBar>
      <View style={styles.headerContainer}>
        <MyText style={styles.header}>Create an account</MyText>
      </View>
      <Input label="First Name"></Input>
      <Input label="Last Name"></Input>
      <Input label="Country"></Input>
      <Input label="Phone Number" isNumberPad={true} placeholder="+961 123 456"></Input>
      <Button>
        Sign up!{" "}
        <SimpleLineIcons
          name="login"
          size={Platform.OS === "ios" ? 20 : 16}
          color="white"
        />
      </Button>
    </View>
  );
};

export default SignUpDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  nameContainer: {
    flexDirection: "row",
  },
  nameInput: {
    flex: 1,
  },
  header: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
  },
  headerContainer: {
    marginTop: Platform.OS === "android" ? 80 : 100,
    marginBottom: 20,
  },
  googleImg: {
    height: 50, //was 75
    width: 50,
    textAlign: "center",
    alignSelf: "center",
    marginTop: 50,
  },
});
