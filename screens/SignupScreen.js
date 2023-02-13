import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import React from "react";
import { Colors } from "../constants/colors";
import SignUp from "../components/SignUp/SignUp";
import MyText from "../components/UI/MyText";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ProgressBar from "../components/UI/ProgressBar";

//THIS IS .WIDTH
const height = Dimensions.get("window").width;


// iphone 14 WIDTH 844
// android simulator WIDTH 683

const SignupScreen = () => {
  const navigation = useNavigation();

  const goBackHandler = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.wrapper}>
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
        <MyText style={styles.header}>Sign up with Email</MyText>
        <ProgressBar one={true} />
      </View>
      <SignUp />
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
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
  icon: {
    position: "absolute",
    top: height < 400 ? 40 : 30, //after semi colon for small android
    left: 7,
    zIndex: 1
  },
  
});
