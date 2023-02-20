import { Platform, StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { Colors } from "../../constants/colors";
import { MaterialIcons } from "@expo/vector-icons";

const height = Dimensions.get('window').height

//my phone height is 755
// iphone 14 height is 844
//emulator is 683

const inValid = false;
const Input = ({ label, customStyle, children, setPassIsVisible, passIsVisible, inValid, inValidText}) => {
  inValid = inValid
  let textInput;

  if (label.includes("Password")) {
    textInput = (
      <View>
        {children}
        {/* <TextInput onChangeText={emailInputHandler} autoCapitalize={false} autoCorrect={false} style={styles.input} secureTextEntry={!passIsVisible ? false: true}></TextInput> */}
        {!passIsVisible && (
          <MaterialIcons
            style={styles.icon}
            name="visibility"
            size={24}
            color={Colors.darkGreen}
            //onPress={() => setPassIsVisible((current) => !current)}
            onPress={() => setPassIsVisible()}
          />
        )}
        {passIsVisible && (
          <MaterialIcons
            name="visibility-off"
            size={24}
            color={Colors.darkGreen}
            style={styles.icon}
            //onPress={() => setPassIsVisible((current) => !current)}
            onPress={() => setPassIsVisible()}
          />
        )}
      </View>
    );
  } else {
    textInput = <View>{children}</View>
   //textInput = <TextInput onChangeText={emailInputHandler} autoCapitalize={false} autoCorrect={false} keyboardType={isNumberPad && 'number-pad'} placeholder={placeholder} style={styles.input}></TextInput>;
  }

  
  

  return (
    <View style={[styles.inputWrapper, customStyle]}>
      <Text style={styles.label}>{label}</Text>
      {textInput}
      {inValid && <Text style={[styles.label, styles.inValidText ]}>{inValidText}</Text>}
    </View>
  );
};

export default Input;
const styles = StyleSheet.create({
  inputWrapper: {
    //marginTop: 40
    marginBottom: 15
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
    padding: height < 800 ? 7 : 12,
    //marginBottom: 15,
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 20, //was 10,
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
  inValidText: {
    color: Colors.errorRedDark, 
    opacity: 0.8,
    fontSize: 12
  }
});
