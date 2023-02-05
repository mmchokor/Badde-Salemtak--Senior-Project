import { Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants/colors";
import { MaterialIcons } from "@expo/vector-icons";

const Input = ({ label }) => {
  const [passIsVisible, setPassIsVisible] = useState(true);

  let passTextInput;

  if (label === "Password") {
    passTextInput = (
      <View>
        <TextInput style={styles.input} secureTextEntry={!passIsVisible ? false: true}></TextInput>
        {/* <Pressable style = {({pressed}) => pressed && styles.pressed}> */}
        {!passIsVisible && (
          <MaterialIcons
            style={styles.icon}
            name="visibility"
            size={24}
            color={Colors.darkGreen}
            onPress={() => setPassIsVisible((current) => !current)}
          />
        )}
        {passIsVisible && (
          <MaterialIcons
            name="visibility-off"
            size={24}
            color={Colors.darkGreen}
            style={styles.icon}
            onPress={() => setPassIsVisible((current) => !current)}
          />
        )}

        {/* </Pressable> */}
      </View>
    );
  } else {
    passTextInput = <TextInput style={styles.input}></TextInput>;
  }

  

  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>{label}</Text>
      {/* {label} */}
      {/* <TextInput style={styles.input} secureTextEntry = {label === 'Password' ? true : false}></TextInput> */}
      {passTextInput}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputWrapper: {
    //marginTop: 40
  },
  label: {
    fontFamily: "inter-regular",
    color: Colors.gray,
    fontSize: Platform.OS == 'ios' ? 20 : 16,
    //fontSize: 20
    marginLeft: 20,
    marginBottom: 2,
  },
  input: {
    padding: Platform.OS === "android" ? 10 : 15,
    marginBottom: 15,
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 20,
  },
  pressed: {
    opacity: 0.75,
  },
  icon: {
    position: "absolute",
    top: 10,
    bottom: 0,
    left: '90%',
    right: 0,
    margin: 'auto'
  },
});
