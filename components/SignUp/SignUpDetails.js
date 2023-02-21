import {
  Image,
  StyleSheet,
  TextInput,
  View,
  Platform,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import CredentialWrapper from "../UI/CredentialWrapper";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import DropDownPicker from "react-native-dropdown-picker";

// iphone 14 height 844
// android simulator height 683

const height = Dimensions.get("window").height;
const SignUpDetails = () => {
  const [firstName, setFirstName] = useState("");
  const [firstNameIsValid, setFirstNameIsValid] = useState(true);
  const [lastName, setLastName] = useState("");
  const [lastNameIsValid, setLastNameIsValid] = useState(true);
  const [country, setCountry] = useState("");
  const [countryIsValid, setCountryIsValid] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberIsValid, setPhoneNumberIsValid] = useState(true);
  const navigation = useNavigation();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Lebanon", value: "Lebanon" },
    { label: "United Arab Emirates", value: "United Arab Emirates" },
    { label: "Saudi Arabia", value: "Saudi Arabia" },
  ]);

  function firstNameHandler(userInput) {
    setFirstName(userInput);
  }
  function lastNameHandler(userInput) {
    setLastName(userInput);
  }

  function phonenumberHandler(userInput) {
    setPhoneNumber(userInput);
  }

  const signUpHandler = () => {
    if (value !== null) {
      setCountryIsValid(true);
    } else {
      setCountryIsValid(false);
    }
    if (firstName.trim().length > 0) {
      setFirstNameIsValid(true);
    } else {
      setFirstNameIsValid(false);
    }
    if (lastName.trim().length > 0) {
      setLastNameIsValid(true);
    } else {
      setLastNameIsValid(false);
    }
    if (phoneNumber.trim().length >= 12) {
      setPhoneNumberIsValid(true);
    } else {
      setPhoneNumberIsValid(false);
    }

    const firstNameIsValid = firstName.trim().length > 0 ? true : false;
    const lastNameIsValid = lastName.trim().length > 0 ? true : false;
    const phoneNumberIsValid = phoneNumber.trim().length >= 12 ? true : false;

    if (firstNameIsValid && lastNameIsValid && phoneNumberIsValid) {
      //user data collected from the user
      const userData = {
        firstName,
        lastName,
        phoneNumber,
        country: value
      };


      navigation.navigate("otpScreen");
    }
  };

  return (
    <CredentialWrapper style={styles.wrapper}>
      <View style={styles.container}>
        <StatusBar status="dark"></StatusBar>
        {/* First Name Input */}
        <Input
          label="First Name"
          inValid={!firstNameIsValid}
          inValidText="First Name can't be empty"
        >
          <TextInput
            onChangeText={firstNameHandler}
            autoCapitalize={false}
            autoCorrect={false}
            style={[styles.input, !firstNameIsValid && styles.inValidInput]}
          ></TextInput>
        </Input>
        {/* Last Name Input */}
        <Input
          label="Last Name"
          inValid={!lastNameIsValid}
          inValidText="Last Name can't be empty"
        >
          <TextInput
            onChangeText={lastNameHandler}
            autoCapitalize={false}
            autoCorrect={false}
            style={[styles.input, !lastNameIsValid && styles.inValidInput]}
          ></TextInput>
        </Input>
        {/* Country Input */}
        <Input
          label="Country"
          inValid={!open && !countryIsValid}
          inValidText="Please select a country"
          customStyle={Platform.OS === 'ios' ? {zIndex: 100} : {}}
        >
          
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={[styles.input, !countryIsValid && styles.inValidInput]}
          />
        </Input>
        {/* Phone Number */}
        <Input
          label="Phone Number"
          inValid={!phoneNumberIsValid}
          inValidText="Phone number must be at least 12 characters"
        >
          <TextInput
            onChangeText={phonenumberHandler}
            autoCapitalize={false}
            autoCorrect={false}
            keyboardType="phone-pad"
            placeholder="+961 81 123 456"
            style={[styles.input, !phoneNumberIsValid && styles.inValidInput]}
          ></TextInput>
        </Input>

        <Button onPress={signUpHandler}>
          Sign up!{" "}
          <SimpleLineIcons
            name="login"
            size={Platform.OS === "ios" ? 20 : 16}
            color="white"
          />
        </Button>
      </View>
    </CredentialWrapper>
  );
};

export default SignUpDetails;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
  },
  container: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: "row",
  },
  nameInput: {
    flex: 1,
  },
  googleImg: {
    height: 50, //was 75
    width: 50,
    textAlign: "center",
    alignSelf: "center",
    marginTop: 50,
  },
  input: {
    padding: height < 800 ? 7 : 12,
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
