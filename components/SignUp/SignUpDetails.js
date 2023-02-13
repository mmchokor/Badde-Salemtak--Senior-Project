import { Image, StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import CredentialWrapper from "../UI/CredentialWrapper";
import { SimpleLineIcons } from "@expo/vector-icons";

// iphone 14 height 844
// android simulator height 683

const SignUpDetails = () => {
  const navigation = useNavigation();

  const signUpHandler = () => {
    navigation.navigate('otpScreen')
  }

  return (
    <CredentialWrapper style={styles.wrapper}>
      <View style={styles.container}>
        <StatusBar status="dark"></StatusBar>
        <Input label="First Name"></Input>
        <Input label="Last Name"></Input>
        <Input label="Country"></Input>
        <Input label="Phone Number" isNumberPad={true} placeholder="+961 123 456"></Input>

        <Button onPress={signUpHandler}>
          Sign up!{" "}
          <SimpleLineIcons
            name="login"
            size={Platform.OS === "ios" ? 20 : 16}
            color="white"
          />
        </Button>
      </View>
    </CredentialWrapper>
  );
};

export default SignUpDetails;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
  },
  container: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: "row",
  },
  nameInput: {
    flex: 1,
  },
  googleImg: {
    height: 50, //was 75
    width: 50,
    textAlign: "center",
    alignSelf: "center",
    marginTop: 50,
  },
});
