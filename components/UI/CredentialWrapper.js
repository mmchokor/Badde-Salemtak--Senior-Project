import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/colors";

const CredentialWrapper = ({children}) => {
  return <View style={styles.credentialWrapper}>{children}</View>;
};

export default CredentialWrapper;

const styles = StyleSheet.create({
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
});
