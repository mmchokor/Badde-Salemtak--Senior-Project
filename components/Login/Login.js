import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/colors";
import Input from "../UI/Input";
import Button from "../UI/Button";
import LoginHeader from "./LoginHeader";
import { useNavigation } from "@react-navigation/native";
import CredentialWrapper from "../UI/CredentialWrapper";

const height = Dimensions.get("window").height;

const Login = () => {
  const navigation = useNavigation();

  const LoginHandler = () => {
    navigation.navigate("Homee");
  };

  const signUpBtnPressedHandler = () => {
    navigation.navigate("signup");
  };
  return (
    <View
      style={styles.container}
      alwaysBounceVertical={false}
      showsVerticalScrollIndicator={false}
    >
      <LoginHeader />

      {/* scroll view */}
      {/* <View style={styles.credentialWrapper}> */}
      <CredentialWrapper>
        <Input label="Email" />
        <Input label="Password" />

        <Text style={styles.forgotPass}>Forgot Password?</Text>

        {/* <View style={styles.loginContainer}> */}
        <Button onPress={LoginHandler}>Log in</Button>
        <Text style={styles.orWord}>Or</Text>

        <Image
          style={styles.googleImg}
          source={require("../../assets/LoginImages/googleLogo.png")}
        />
        {/* </View> */}
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
      {/* </View> */}
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
});
