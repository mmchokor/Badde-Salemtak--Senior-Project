import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Dimensions,
  TextInput,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/colors";
import Input from "../UI/Input";
import Button from "../UI/Button";
import LoginHeader from "./LoginHeader";
import { useNavigation } from "@react-navigation/native";
import CredentialWrapper from "../UI/CredentialWrapper";
import { useAtom } from "jotai";
import { isLoggedIn, authToken } from "../../store/LoginStore/LoginStore";
import { useMutation } from "react-query";
import { signIn } from "../../api/userAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

const height = Dimensions.get("window").height;

const Login = () => {
  const [password, setPassword] = useState("");
  const [passIsValid, setPassIsValid] = useState(true);
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);
  const navigation = useNavigation();
  const [passIsVisible, setPassIsVisible] = useState(true);
  const [, setToggleLoggedin] = useAtom(isLoggedIn);
  const [, setAuthToken] = useAtom(authToken);
  const loginQuery = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
        setAuthToken(data.data.token),
        AsyncStorage.setItem("token", data.data.token),
        setToggleLoggedin(true);
    },
    onError: (data) => setIncorrectCredentials(true),
  });

  function passwordInputHandler(userInput) {
    setPassword(userInput);
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

  const setPassIsVisibleHandler = () => {
    setPassIsVisible((current) => !current);
  };

  const LoginHandler = () => {
    if (password.trim().length < 6) {
      setPassIsValid(false);
    } else {
      setPassIsValid(true);
    }
    setEmailIsValid(ValidateEmail(email));

    const passIsValid = password.trim().length < 6 ? false : true;
    const emailIsValid = ValidateEmail(email);

    if (passIsValid && emailIsValid) {
      //user Data collected
      const userData = {
        email,
        password,
      };
      loginQuery.mutate(userData);
    }
  };

  const signUpBtnPressedHandler = () => {
    navigation.navigate("signup");
    //navigation.navigate("signupDetails");
  };
  return (
    <View
      style={styles.container}
      alwaysBounceVertical={false}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar style="light" />
      <LoginHeader />

      <CredentialWrapper>
        {/* Email Input */}
        <Input
          label="Email"
          inValid={!emailIsValid}
          inValidText="Invalid Email!"
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
          inValidText="Invalid Password!"
        >
          <TextInput
            onChangeText={passwordInputHandler}
            autoCapitalize={false}
            autoCorrect={false}
            style={[styles.input, !passIsValid && styles.inValidInput]}
            secureTextEntry={!passIsVisible ? false : true}
          ></TextInput>
        </Input>
        {incorrectCredentials && (
          <View style={styles.forgotPassContainer}>
            {
              <Text style={styles.incorrectPass}>
                Incorrect Email or Password!
              </Text>
            }
            <Text style={styles.forgotPass}>Forgot Password?</Text>
          </View>
        )}
        {!incorrectCredentials && (
          <Text style={styles.forgotPass}>Forgot Password?</Text>
        )}
        <Button onPress={LoginHandler}>
          {loginQuery.isLoading ? "Loading..." : "Log in"}
        </Button>
        <Text style={styles.orWord}>Or</Text>

        <Image
          style={styles.googleImg}
          source={require("../../assets/LoginImages/googleLogo.png")}
        />
        <View style={styles.signInWrapper}>
          <Text style={styles.accountText}>Don't have an account? </Text>
          <Text
            onPress={signUpBtnPressedHandler}
            style={[styles.accountText, styles.signupText]}
          >
            Sign up!
          </Text>
        </View>
      </CredentialWrapper>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  credentialWrapper: {
    flex: 1,
    backgroundColor: Colors.white,
    width: "100%",
    height: "100%",
    //marginTop: Platform.OS === "android" ? 160 : 170,
    marginTop: Platform.OS === "android" ? 120 : 140,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    //paddingTop: 50,
    paddingTop: Platform.OS === "ios" ? 30 : 20,
  },
  forgotPassContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  incorrectPass: {
    marginLeft: 20,
    color: Colors.errorRedDark,
  },
  forgotPass: {
    alignSelf: "flex-end",
    color: Colors.darkGreen,
    fontWeight: "bold",
    fontSize: 14,
  },
  orWord: {
    textAlign: "center",
    fontFamily: "inter-regular",
    //fontSize: 20,
    fontSize: 16,
    //marginVertical: 15,
    marginVertical: height < 700 ? 7 : 15,
  },
  googleImg: {
    height: 50, //was 75
    width: 50,
    textAlign: "center",
    alignSelf: "center",
  },
  pressed: {
    opacity: 0.75,
  },
  signInWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    //marginTop: 12,
    marginTop: Platform.OS === "ios" ? 30 : height < 700 ? 6 : 12,
  },
  accountText: {
    fontSize: Platform.OS === "ios" ? 20 : 18,
    fontFamily: "inter-bold",
    fontWeight: "bold",
  },
  signupText: {
    color: Colors.darkGreen,
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
