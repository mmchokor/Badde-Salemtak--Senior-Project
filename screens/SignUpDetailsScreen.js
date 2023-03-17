import { StyleSheet, Text, View, Dimensions, Pressable, Button } from "react-native";
import React from "react";
import { Colors } from "../constants/colors";
import SignUpDetails from "../components/SignUp/SignUpDetails";
import MyText from "../components/UI/MyText";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ProgressBar from "../components/UI/ProgressBar";

const height = Dimensions.get("window").width;

const SignupDetailsScreen = ({route}) => {
  const navigation = useNavigation();

  const goBackHandler = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.wrapper}>
      <Pressable onPress={goBackHandler} style={({pressed}) => pressed ? [styles.icon, {opacity: 0.75}] : styles.icon}>
        <View >
          <Ionicons
            name="arrow-back"
            size={32}
            color={Colors.white}
          />
        </View>
      </Pressable>
      <View style={styles.headerContainer}>
        <MyText style={styles.header}>Enter your details</MyText>
        <ProgressBar two={true} />
      </View>
      <SignUpDetails userData={route.params.userData} />
    </View>
  );
};

export default SignupDetailsScreen;

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
