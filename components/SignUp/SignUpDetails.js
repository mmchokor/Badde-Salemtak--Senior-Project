import { SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useMutation } from "react-query";
import { signUp } from "../../api/userAPI";
import { Colors } from "../../constants/colors";
import Button from "../UI/Button";
import CredentialWrapper from "../UI/CredentialWrapper";
import Input from "../UI/Input";

// iphone 14 height 844
// android simulator height 683

const height = Dimensions.get("window").height;
const SignUpDetails = ({ userData }) => {
  const [firstName, setFirstName] = useState("");
  const [firstNameIsValid, setFirstNameIsValid] = useState(true);
  const [lastName, setLastName] = useState("");
  const [lastNameIsValid, setLastNameIsValid] = useState(true);
  const [countryIsValid, setCountryIsValid] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberIsValid, setPhoneNumberIsValid] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const navigation = useNavigation();

  const { mutate, isLoading } = useMutation(signUp, {
    onSuccess: () => navigation.navigate("Login"),
    onError: () =>
      Alert.alert("Sign up error", "Please try again", [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK" },
      ]),
  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Lebanon", value: "Lebanon" },
    { label: "United Arab Emirates", value: "United Arab Emirates" },
    { label: "Saudi Arabia", value: "Saudi Arabia" },
    { label: "Afghanistan", value: "Afghanistan" },
    { label: "Albania", value: "Albania" },
    { label: "Algeria", value: "Algeria" },
    { label: "Andorra", value: "Andorra" },
    { label: "Angola", value: "Angola" },
    { label: "Antigua and Barbuda", value: "Antigua and Barbuda" },
    { label: "Argentina", value: "Argentina" },
    { label: "Armenia", value: "Armenia" },
    { label: "Australia", value: "Australia" },
    { label: "Austria", value: "Austria" },
    { label: "Azerbaijan", value: "Azerbaijan" },
    { label: "Bahamas", value: "Bahamas" },
    { label: "Bahrain", value: "Bahrain" },
    { label: "Bangladesh", value: "Bangladesh" },
    { label: "Barbados", value: "Barbados" },
    { label: "Belarus", value: "Belarus" },
    { label: "Belgium", value: "Belgium" },
    { label: "Belize", value: "Belize" },
    { label: "Benin", value: "Benin" },
    { label: "Bhutan", value: "Bhutan" },
    { label: "Bolivia", value: "Bolivia" },
    { label: "Bosnia and Herzegovina", value: "Bosnia and Herzegovina" },
    { label: "Botswana", value: "Botswana" },
    { label: "Brazil", value: "Brazil" },
    { label: "Brunei", value: "Brunei" },
    { label: "Bulgaria", value: "Bulgaria" },
    { label: "Burkina Faso", value: "Burkina Faso" },
    { label: "Burundi", value: "Burundi" },
    { label: "Cabo Verde", value: "Cabo Verde" },
    { label: "Cambodia", value: "Cambodia" },
    { label: "Cameroon", value: "Cameroon" },
    { label: "Canada", value: "Canada" },
    { label: "Central African Republic", value: "Central African Republic" },
    { label: "Chad", value: "Chad" },
    { label: "Chile", value: "Chile" },
    { label: "China", value: "China" },
    { label: "Colombia", value: "Colombia" },
    { label: "Comoros", value: "Comoros" },
    { label: "Costa Rica", value: "Costa Rica" },
    { label: "Croatia", value: "Croatia" },
    { label: "Cuba", value: "Cuba" },
    { label: "Cyprus", value: "Cyprus" },
    { label: "Denmark", value: "Denmark" },
    { label: "Djibouti", value: "Djibouti" },
    { label: "Dominica", value: "Dominica" },
    { label: "Dominican Republic", value: "Dominican Republic" },
    { label: "Ecuador", value: "Ecuador" },
    { label: "Egypt", value: "Egypt" },
    { label: "El Salvador", value: "El Salvador" },
    { label: "Equatorial Guinea", value: "Equatorial Guinea" },
    { label: "Eritrea", value: "Eritrea" },
    { label: "Estonia", value: "Estonia" },
    { label: "Ethiopia", value: "Ethiopia" },
    { label: "Fiji", value: "Fiji" },
    { label: "Finland", value: "Finland" },
    { label: "France", value: "France" },
    { label: "Gabon", value: "Gabon" },
    { label: "Gambia", value: "Gambia" },
    { label: "Georgia", value: "Georgia" },
    { label: "Germany", value: "Germany" },
    { label: "Ghana", value: "Ghana" },
    { label: "Greece", value: "Greece" },
    { label: "Grenada", value: "Grenada" },
    { label: "Guatemala", value: "Guatemala" },
    { label: "Guinea", value: "Guinea" },
    { label: "Guinea-Bissau", value: "Guinea-Bissau" },
    { label: "Guyana", value: "Guyana" },
    { label: "Haiti", value: "Haiti" },
    { label: "Honduras", value: "Honduras" },
    { label: "Hungary", value: "Hungary" },
    { label: "Iceland", value: "Iceland" },
    { label: "India", value: "India" },
    { label: "Indonesia", value: "Indonesia" },
    { label: "Iran", value: "Iran" },
    { label: "Iraq", value: "Iraq" },
    { label: "Ireland", value: "Ireland" },
    { label: "Israel", value: "Israel" },
    { label: "Italy", value: "Italy" },
    { label: "Jamaica", value: "Jamaica" },
    { label: "Japan", value: "Japan" },
    { label: "Jordan", value: "Jordan" },
    { label: "Kazakhstan", value: "Kazakhstan" },
    { label: "Kenya", value: "Kenya" },
    { label: "Kiribati", value: "Kiribati" },
    { label: "Korea, North", value: "Korea, North" },
    { label: "Korea, South", value: "Korea, South" },
    { label: "Kosovo", value: "Kosovo" },
    { label: "Kuwait", value: "Kuwait" },
    { label: "Kyrgyzstan", value: "Kyrgyzstan" },
    { label: "Laos", value: "Laos" },
    { label: "Latvia", value: "Latvia" },
    { label: "Lesotho", value: "Lesotho" },
    { label: "Liberia", value: "Liberia" },
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
      let userDataDetails = {
        firstname: firstName,
        lastname: lastName,
        phone: phoneNumber.toString(),
        country: value,
      };

      userDataDetails = { ...userData, ...userDataDetails };
      console.log(userDataDetails);
      setUserInfo(userDataDetails);

      mutate(userDataDetails);

      // if (success) {
      //   console.log("User added")
      //   navigation.navigate("Login")
      // }

      //navigation.navigate("otpScreen");
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
          customStyle={Platform.OS === "ios" ? { zIndex: 100 } : {}}
        >
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={[styles.input, !countryIsValid && styles.inValidInput]}
            placeholder="Please select a country"
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
          {/* Sign up!{" "} */}
          {isLoading ? "Signing you up!" : "Sign up"}
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
