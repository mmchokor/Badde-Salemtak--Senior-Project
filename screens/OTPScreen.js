import {
  StyleSheet,
  Pressable,
  View,
  Dimensions,
  StatusBar,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import OTPTextInput from "react-native-otp-textinput";
import MyText from "../components/UI/MyText";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constants/colors";
import CredentialWrapper from "../components/UI/CredentialWrapper";
import Button from "../components/UI/Button";
import ProgressBar from "../components/UI/ProgressBar";

const height = Dimensions.get("window").width;

const OTPScreen = () => {
  const navigation = useNavigation();

  const [OtpInput, setOtpInput] = useState("");
  const [timer, setTimer] = useState(59);

  const resetCodeHandler = () => {
    setTimer(59);
  };

  useEffect(() => {
    const id = setInterval(() => {
      setTimer((current) => current > 0 && current - 1);
    }, 1000);
    return function cleanup() {
      clearInterval(id);
    };
  }, [timer]);

  const otpTextHandler = (input) => {
    setOtpInput(input);
  };

  const OtpSubmitHandler = () => {
    console.log(OtpInput);
  };

  const goBackHandler = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.wrapper}>
      <StatusBar status="light"></StatusBar>
      <Pressable
        onPress={goBackHandler}
        style={({ pressed }) =>
          pressed ? [styles.icon, { opacity: 0.75 }] : styles.icon
        }
      >
        <View>
          <Ionicons name="arrow-back" size={32} color={Colors.white} />
        </View>
      </Pressable>
      <View style={styles.headerContainer}>
        <MyText style={styles.header}>Confirm your Email</MyText>
        <ProgressBar three={true} />
      </View>
      <MyText style={styles.subHeader}>
        Kindly check the code that you have receied at{" "}
        <MyText style={{ color: Colors.lightGreen, fontWeight: "bold" }}>
          xyz@gmail.com
        </MyText>
      </MyText>
      <CredentialWrapper style={styles.credentialWrapper}>
        <View style={styles.container}>
          <OTPTextInput
            handleTextChange={otpTextHandler}
            textInputStyle={{ color: Colors.darkGreen }}
            containerStyle={{ marginTop: 0 }}
          />
          {timer > 0 ? (
            <MyText style={styles.resendCode}>Resend Code: {timer}</MyText>
          ) : (
            <Button
              style={{ backgroundColor: Colors.white}}
              textStyle={{color: Colors.darkGreen}}
              onPress={resetCodeHandler}
            >
              Resend Code
            </Button>
          )}
          <Button onPress={OtpSubmitHandler}>Submit</Button>
        </View>
      </CredentialWrapper>
    </View>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  credentialWrapper: {
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
  wrapper: {
    flex: 1,
    backgroundColor: Colors.darkGreen,
  },
  header: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.white,
    paddingTop: 20,
  },
  headerContainer: {
    // marginTop: Platform.OS === "android" ? 50 : 80,
    marginTop: height < 700 ? 50 : 80,
    marginBottom: 20,
  },
  subHeader: {
    color: Colors.white,
    fontSize: 16,
    margin: 10,
    marginTop: 20,
  },
  icon: {
    position: "absolute",
    top: height < 400 ? 40 : 30, //after semi colon for small android
    left: 7,
    zIndex: 1,
  },
  resendCode: {
    color: Colors.lightGreen,
    marginTop: 10,
  },
});
