import {
  Image,
  StyleSheet,
  View,
  Platform,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import MyText from "../UI/MyText";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../../constants/colors";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CredentialWrapper from "../UI/CredentialWrapper";

const height = Dimensions.get("window").height;
// iphone 14 height 844
// android simulator height 683

const SignUp = () => {
  const [password, setPassword] = useState("");
  const [passIsValid, setPassIsValid] = useState(true);
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPassIsValid, setConfirmPassIsValid] = useState(true);
  const [passIsVisible, setPassIsVisible] = useState(true);

  function passwordInputHandler(userInput) {
    setPassword(userInput);
  }
  function confirmPasswordInputHandler(userInput) {
    setConfirmPassword(userInput);
  }
  function emailInputHandler(userInput) {
    setEmail(userInput);
  }

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }
  function CheckPassword(inputtxt) {
    let paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    if (inputtxt.match(paswd)) {
      return true;
    } else {
      return false;
    }
  }

  const setPassIsVisibleHandler = () => {
    setPassIsVisible((current) => !current);
  };
  const navigation = useNavigation();

  const SignUpDetailsHandler = () => {
   
    setPassIsValid(CheckPassword(password))
    setEmailIsValid(ValidateEmail(email));
    if (password.length === 0 || confirmPassword.trim() !== password.trim()) {
      setConfirmPassIsValid(false);
    } else {
      setConfirmPassIsValid(true);
    }

    const passIsValid = CheckPassword(password)
    const confirmPassIsValid =
      password.length === 0 || confirmPassword.trim() !== password.trim()
        ? false
        : true;
    const emailIsValid = ValidateEmail(email);

    if (passIsValid && emailIsValid && confirmPassIsValid) {
      //user data that was received from user
      const userData = {
        email,
        password,
        confirmPassword,
      };

      navigation.navigate("signupDetails");
    }
  };

  return (
    <CredentialWrapper style={styles.wrapper}>
      <View showsVerticalScrollIndicator={false} style={styles.container}>
        <StatusBar status="dark"></StatusBar>
        {/* Email Input */}
        <Input
          label="Email"
          inValid={!emailIsValid}
          inValidText="Invalid Email Format!"
        >
          <TextInput
            onChangeText={emailInputHandler}
            autoCapitalize={false}
            autoCorrect={false}
            style={[styles.input, !emailIsValid && styles.inValidInput]}
          ></TextInput>
        </Input>
        {/* Pass Input */}
        <Input
          label="Password"
          setPassIsVisible={setPassIsVisibleHandler}
          passIsVisible={passIsVisible}
          inValid={!passIsValid}
          inValidText="Must be greater than 6 characters, include special characters, and numbers!"
        >
          <TextInput
            onChangeText={passwordInputHandler}
            autoCapitalize={false}
            autoCorrect={false}
            style={[styles.input, !passIsValid && styles.inValidInput]}
            secureTextEntry={!passIsVisible ? false : true}
          ></TextInput>
        </Input>
        {/* Confirm Pass Input */}
        <Input
          label="Confirm Password"
          setPassIsVisible={setPassIsVisibleHandler}
          passIsVisible={passIsVisible}
          inValid={!confirmPassIsValid}
          inValidText="Passwords should match!"
        >
          <TextInput
            onChangeText={confirmPasswordInputHandler}
            autoCapitalize={false}
            autoCorrect={false}
            style={[styles.input, !confirmPassIsValid && styles.inValidInput]}
            secureTextEntry={!passIsVisible ? false : true}
          ></TextInput>
        </Input>
        <Button onPress={SignUpDetailsHandler} style={{marginTop: height < 800 ? 5 : 15}}>
          Next Step
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
            marginTop: height < 800 ? 10 : 30,//was 30
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
    marginTop: height < 800 ? 10 : 30 // 30,
  },
  input: {
    padding: height < 800 ? 7 : 12,
    //marginBottom: 15,
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 20, //was 10,
  },
  inValidInput: {
    borderColor: "#FFCCCC",
    borderWidth: 1,
    backgroundColor: "#fae8e8",
  },
});
