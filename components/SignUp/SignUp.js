import { Image, StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import MyText from "../UI/MyText";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../../constants/colors";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CredentialWrapper from "../UI/CredentialWrapper";

// iphone 14 height 844
// android simulator height 683

const SignUp = () => {
  const navigation = useNavigation();

  const SignUpDetailsHandler = () => {
    navigation.navigate("signupDetails");
  };

  return (
    <CredentialWrapper style={styles.wrapper}>
      <View style={styles.container}>
        <StatusBar status="dark"></StatusBar>
        <Input label="Email"></Input>
        <Input label="Password"></Input>
        <Input label="Confirm Password"></Input>
        <Button onPress={SignUpDetailsHandler}>
          Next Step{" "}
          <AntDesign
            name="arrowright"
            size={Platform.OS === "ios" ? 20 : 16}
            color="white"
          />
        </Button>

        <MyText
          style={{
            marginTop: 20,
            textAlign: "center",
            fontSize: 12,
            color: Colors.gray,
          }}
          onPress={() => navigation.navigate("Login")}
        >
          Already Have an Account?
        </MyText>

        <View
          style={{
            borderBottomColor: Colors.gray,
            borderBottomWidth: 2,
            marginTop: 30,
          }}
        ></View>
        <Image
          style={styles.googleImg}
          source={require("../../assets/LoginImages/googleLogo.png")}
        />
      </View>
    </CredentialWrapper>
  );
};

export default SignUp;

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
