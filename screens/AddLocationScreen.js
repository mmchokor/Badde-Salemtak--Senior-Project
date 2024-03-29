import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  KeyboardAvoidingView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../constants/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import { flags } from "../constants/flags";
import { useMutation } from "react-query";
import { createTravelerListing } from "../api/travelerListingAPI";
import { isLoading } from "../store/AddLocationLoading/AddLocationLoading";
import { useAtom } from "jotai";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BorderStyle from "../components/AddItemsLocations/BorderStyle";
import ItemType from "../components/AddItemsLocations/ItemType";
import InputBorderStyle from "../components/AddItemsLocations/InputBorderStyle";
import PreferredPayment from "../components/AddItemsLocations/PreferredPayment";
import DropDownPicker from "react-native-dropdown-picker";
import Button from "../components/UI/Button";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Toast from "react-native-toast-message";
import { color } from "react-native-reanimated";

function AddLocationScreen({ navigation }) {
  function PressEventHandler() {
    navigation.navigate("Item");
  }
  const [loading, setLoading] = useAtom(isLoading);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([flags]);
  const [weight, setWeight] = useState(""); // Preferred Weight
  const [itemType, setType] = useState("");
  const [ticket, setTicket] = useState(""); // Ticket Number
  const [dimensionX, setDimensionX] = useState(""); // DimensionsX
  const [dimensionY, setDimensionY] = useState(""); // DimensionsY
  const [dimensionZ, setDimensionZ] = useState(""); // DimensionsZ
  const [detail, setDetail] = useState(""); // More Details
  const [selectedOption, setSelectedOption] = useState("");
  const [countryFlag, setCountryFlag] = useState(false);
  const [weightFlag, setWeightFlag] = useState(false);
  const [typeFlag, setTypeFlag] = useState(false);
  const [ticketFlag, setTicketFlag] = useState(false);
  const [preferredPayFlag, setPreferredPayFlag] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDateIsEmpty, setSelectedDateIsEmpty] = useState(false);
  const [detailFlag, setDetailFlag] = useState(false);
  const { mutate, error } = useMutation(createTravelerListing, {
    onSuccess: onSuccessHandler,
    onError: onErrorHandler,
  });
  function onSuccessHandler() {
    setLoading(false);

    const parent = navigation.getParent("bottomTab");

    parent.navigate("Home", {
      screen: "TravelerorResident",
      params: { screen: "Residentt", params: { load: true } },
    });
  }
  function onErrorHandler() {
    setLoading(false);

    Toast.show({
      type: "error",
      text1: "Unfortunately, Your listing has not been added.",
    });
  }

  let setSelectedCountry = "";
  if (value !== null) {
    for (const key in flags) {
      if (flags[key] === value) {
        setSelectedCountry = key;
        break;
      }
    }
  }
  //console.log(setSelectedCountry);

  const handleInputWeight = (text) => {
    setWeight(text);
    setWeightFlag(false);
  };
  const handleInputTicket = (text) => {
    setTicket(text);
    setTicketFlag(false);
  };
  const handleInputDimensionX = (text) => {
    setDimensionX(text);
  };
  const handleInputDimensionY = (text) => {
    setDimensionY(text);
  };
  const handleInputDimensionZ = (text) => {
    setDimensionZ(text);
  };
  const handleInputDetail = (text) => {
    setDetail(text);
    setDetailFlag(false);
  };

  const handleType = (option) => {
    setType(option);
    setTypeFlag(false);
  };
  function handlePaymentMethod(option) {
    setSelectedOption(option);
    setPreferredPayFlag(false);
  }
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const today = new Date(date);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[today.getMonth()];
    const day = today.getDate();
    const year = today.getFullYear();

    setSelectedDate([month, day, year].join(" "));
    setSelectedDateIsEmpty(false);
    hideDatePicker();
  };
  let type = ""; // Preferred Type
  switch (itemType) {
    case 0:
      type = "Electronics";
      break;
    case 1:
      type = "Food";
      break;
    case 2:
      type = "Clothes";
      break;
    case 3:
      type = "Medicine";
      break;
    case 4:
      type = "Accessories";
      break;
    case 5:
      type = "Others";
      break;
    default:
      type = "";
  }
  let PreferredPaymentMethod = ""; //Preferred payment Method

  switch (selectedOption) {
    case 0:
      PreferredPaymentMethod = "Cash";
      break;
    case 1:
      PreferredPaymentMethod = "MoneyTransfer";
      break;
    case 2:
      PreferredPaymentMethod = "BankTransfer";
      break;

    default:
      PreferredPaymentMethod = "";
  }
  function handleAddLocation() {
    let allConditionsMet = true;

    if (setSelectedCountry === "") {
      setCountryFlag(true);
      allConditionsMet = false;
    }
    if (weight === "") {
      setWeightFlag(true);
      allConditionsMet = false;
    }
    if (ticket === "") {
      setTicketFlag(true);
      allConditionsMet = false;
    }
    if (PreferredPaymentMethod === "") {
      setPreferredPayFlag(true);
      allConditionsMet = false;
    }
    if (selectedDate === "") {
      setSelectedDateIsEmpty(true);
      allConditionsMet = false;
    }
    if (detail === "") {
      setDetailFlag(true);
      allConditionsMet = false;
    }
    if (allConditionsMet) {
      addLocation();
    }
  }
  const addLocation = async () => {
    setLoading(true);
    let exWeight = parseInt(weight);
    let dim = dimensionX + "," + dimensionY + "," + dimensionZ;
    const data = {
      extraWeight: exWeight,
      date: selectedDate,
      dimension: dim,
      ticketNumber: ticket,
      residentCity: "Lebanon",
      description: detail,
      paymentMethod: PreferredPaymentMethod,
      productType: type,
      country: setSelectedCountry,
    };
    mutate(data);
  };

  return (
    <ScrollView
      style={{
        //alignItems: 'center',
        backgroundColor: Colors.white,
        marginTop: 3,
        paddingHorizontal: 20,
        flex: 1,
      }}
    >
      <View>
        <Text style={styles.textHead}>Country</Text>

        {/* Drop Down */}
        <View>
          <DropDownPicker
            listMode="MODAL"
            open={open}
            value={value}
            items={Object.entries(items[0]).map(([label, value]) => ({
              label,
              value,
            }))}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            searchable={true}
            searchPlaceholder="Search country"
            searchContainerStyle={{
              borderWidth: 0,
              borderColor: Colors.lightGray,
              borderBottomColor: Colors.lightGray,
            }}
            searchTextInputStyle={{
              borderWidth: 1,
              borderColor: Colors.lightGray,
              borderRadius: 5,
              
            }}
            style={
              countryFlag === false
                ? {
                    //zIndex: 1,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: Colors.lightGray,
                    marginVertical: 5,
                    //marginLeft: 2
                    //margin: -16
                    padding: -8
                  }
                : [
                    {
                      zIndex: 1,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: Colors.lightGray,
                      marginVertical: 5,
                    },
                    { borderColor: Colors.errorRedDark, borderWidth: 1 },
                  ]
            }
            dropDownContainerStyle={{
              borderWidth: 1,
              borderColor: Colors.lightGray,
              borderRadius: 5,
            }}
            textStyle={{
              
            }}
            placeholder="Choose country"
            placeholderStyle={{
              fontSize: 15,
              fontFamily: "inter-regular",
              color: '#9D9D9D',
              padding: -15
            }}
          />
        </View>

        <View>
          <Text style={styles.textHead}>Preferred Weight</Text>
          <TextInput
            style={
              weightFlag == false
                ? styles.inputT
                : [styles.inputT, styles.inputTError]
            }
            keyboardType="number-pad"
            maxLength={4}
            onChangeText={handleInputWeight}
            value={weight}
			placeholder="Enter preferred weight"
          />
          {/* </View> */}
        </View>

        <Text style={styles.textHead}>Flight Date</Text>
        <Pressable
          style={
            selectedDateIsEmpty == false
              ? styles.inputT
              : [styles.inputT, styles.inputTError]
          }
          onPress={showDatePicker}
        >
          <Text style={styles.datePickerText}>
            {selectedDate === "" ? "Select date" : selectedDate}
          </Text>
        </Pressable>
        <DateTimePickerModal
          minimumDate={new Date()}
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <Text style={styles.textHead}>Ticket Number</Text>

        <TextInput
          style={
            ticketFlag == false
              ? styles.inputT
              : [styles.inputT, styles.inputTError]
          }
          keyboardType="default"
          autoCapitalize="characters"
          maxLength={10}
          value={ticket}
          onChangeText={(text) => handleInputTicket(text)}
		  placeholder="Enter ticket number"
        />

        <Text style={styles.textHead}>Description</Text>
        {/* <InputBorderStyle
          style={
            detailFlag === false
              ? [{ padding: 5 }]
              : [
                  [{ padding: 5 }],
                  {
                    borderColor: Colors.errorRedDark,
                  },
                ]
          }
		    placeholder="Enter flight details"
          onChangeText={handleInputDetail}
        /> */}
        <TextInput
        style={
          detailFlag == false
            ? styles.inputT
            : [styles.inputT, styles.inputTError]
        }
        onChangeText={handleInputDetail}
        //value={itemName}
        placeholder="Enter flight details"
      />

        {/* Type */}
        <View style={{ marginVertical: 5 }}>
          <Text
            style={
              typeFlag == false
                ? [styles.textHead, { marginBottom: 6 }]
                : [styles.textHead, { marginBottom: 6, color: "red" }]
            }
          >
            Preferred Type
          </Text>
          <ItemType onSelect={handleType} />
        </View>

        <View style={{ flexDirection: "column", marginVertical: 5 }}>
          <Text style={styles.textHead}>
            Dimensions:
            <Text style={{ color: Colors.gray, fontSize: 14 }}>(optional)</Text>
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: Colors.gray, fontSize: 18 }}>X:</Text>
            <TextInput
              style={styles.inputD}
              keyboardType="number-pad"
              maxLength={4}
              value={dimensionX}
              onChangeText={(text) => handleInputDimensionX(text)}
              placeholder="cm"
            />
            <Text style={{ color: Colors.gray, fontSize: 18 }}>Y:</Text>
            <TextInput
              style={styles.inputD}
              keyboardType="number-pad"
              maxLength={4}
              value={dimensionY}
              onChangeText={(text) => handleInputDimensionY(text)}
              placeholder="cm"
            />
            <Text style={{ color: Colors.gray, fontSize: 18 }}>Z:</Text>
            <TextInput
              style={styles.inputD}
              keyboardType="number-pad"
              maxLength={4}
              value={dimensionZ}
              onChangeText={(text) => handleInputDimensionZ(text)}
              placeholder="cm"
            />
          </View>
        </View>

        <Text style={[styles.textHead, {marginVertical: 5}]}>Preferred Payment Method</Text>

        <PreferredPayment
          onSelectOption={handlePaymentMethod}
          style={preferredPayFlag && styles.inputDetailsError}
        />
        {!loading && (
          <Button style={styles.button} onPress={handleAddLocation}>
            Add Location
          </Button>
        )}
        {loading && (
          <Button style={styles.button}>
            <ActivityIndicator size="small" color={Colors.lightGreen} />
          </Button>
        )}
      </View>
    </ScrollView>
  );
}

export default AddLocationScreen;

const styles = StyleSheet.create({
  textHead: {
    //color: Colors.darkGreen,
    fontSize: 18,
    fontFamily: "inter-regular",
    marginTop: 10,
  },
  upperButton: {
    margin: 5,
    width: 190,
    height: 45,
    backgroundColor: Colors.darkGreen,
    borderRadius: 30,
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  item: {
    padding: 5,
    borderRadius: 30,
    marginLeft: 7,
    color: Colors.white,
  },
  location: {
    backgroundColor: Colors.white,
    padding: 7,
    borderRadius: 30,
    marginRight: 7,
  },
  texI: {
    fontFamily: "inter-regular",
    color: Colors.white,
  },
  textLocation: {
    color: Colors.black,
    fontFamily: "inter-regular",
  },
  // textHead: {
  // 	color: Colors.black,
  // 	fontSize: 18,
  // 	fontFamily: 'inter-regular',
  // 	marginTop: 20,
  // 	marginBottom: 10,
  // },
  // inputT: {
  //   fontFamily: "inter-regular",
  //   color: Colors.black,
  //   fontSize: 18,
  //   borderBottomWidth: 0.5,
  //   borderBottomColor: Colors.gray,
  //   color: Colors.darkGreen,
  //   paddingBottom: 0,
  // },
  textL: {
    color: Colors.darkGreen,
    fontFamily: "inter-light",
  },
  inputDetailsError: {
    borderColor: Colors.errorRedDark,
    borderWidth: 1,
  },
  button: {
    width: "80%",
    margin: 10,
    marginTop: 0,
  },
  datePickerButton: {
    //backgroundColor: Colors.grayBackground,
    padding: 8,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 10,
    borderColor: Colors.gray,
    borderWidth: 1,
    marginLeft: 10,
  },
  datePickerButtonEmpty: {
    backgroundColor: Colors.errorRedLight,
    borderColor: Colors.errorRedDark,
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 25,
  },
  datePickerText: {
    //textAlign: "center",
    //padding: 4,
    marginVertical: 4,
    color: '#9D9D9D',
    fontFamily: 'inter-regular',
    fontSize: 15
  },
  inputD: {
    fontFamily: "inter-regular",
    color: Colors.black,
    fontSize: 18,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.gray,
    color: Colors.darkGreen,
    paddingBottom: 0,
    marginHorizontal: 15,
    width: 80,
  },
  inputT: {
    fontFamily: "inter-regular",
    color: Colors.black,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 5,
    padding: 4,
    marginVertical: 5,
    borderColor: Colors.lightGray,
  },
  inputTError: {
    borderWidth: 1,
    borderColor: Colors.errorRedDark,
  },
});
