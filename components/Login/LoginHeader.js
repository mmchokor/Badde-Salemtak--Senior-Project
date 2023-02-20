import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const LoginHeader = () => {
  return (
    <View style={styles.wrapper}>
      <View>
        {/* Welcome Back */}
        <Text style={styles.header}>Create Your</Text>
        <Text style={styles.header}>account</Text>
      </View>

      <Image
        style={styles.image}
        source={require("../../assets/LoginImages/BadeSalemtakLogo.png")}
      />
    </View>
  );
};

export default LoginHeader;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    //marginTop: 60,
    //marginTop: 40,
    marginTop: height < 690 ? 20 : 50,
  },
  header: {
    color: Colors.white,
    fontSize: 36,
    fontFamily: "inter-bold",
    marginLeft: 10,
  },

  image: {
    height: 175, //was 200
    width: 175,
    borderRadius: 175 / 2,
    backgroundColor: Colors.white,
    position: "absolute",
    //top: 40,
    top: width < 380 ? 40 : 30,
    //left: width > 380 ? 200 : 155
    left: width < 380 ? 190 : 210,
  },
});
