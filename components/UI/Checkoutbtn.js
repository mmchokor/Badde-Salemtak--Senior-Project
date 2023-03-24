import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "./Button";

const Checkoutbtn = ({ children }) => {
  return (
    <View style={styles.buttonWrapper}>
      <Button
        textStyle={{ fontSize: 10 }}
        styleWrapper={styles.buttonWrapper}
        style={styles.button}
      >
        {children}
      </Button>
    </View>
  );
};

export default Checkoutbtn;

const styles = StyleSheet.create({
  buttonWrapper: {
    marginVertical: 20,
    borderRadius: 12,
    flex: 1
  },
  button: {
    //width: "70%",
  },
});
