import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/colors";

const CredentialWrapper = ({children, style}) => {
  return <View style={[styles.credentialWrapper, style]}>{children}</View>;
};

export default CredentialWrapper;

const styles = StyleSheet.create({
    credentialWrapper: {
        flex: 1,
        backgroundColor: Colors.white,
       marginTop: Platform.OS === "android" ? 120 : 140,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30,
       paddingTop: Platform.OS === "ios" ? 30 : 20,
      },
});
