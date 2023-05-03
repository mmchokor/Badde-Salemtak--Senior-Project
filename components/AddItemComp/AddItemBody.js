import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import { useMutation, useQuery } from "react-query";
import { createResidentListing } from "../../api/residentListingsAPI";
import BorderStyle from "../../components/AddItemsLocations/BorderStyle";
import InputBorderStyle from "../../components/AddItemsLocations/InputBorderStyle";
import ItemType from "../../components/AddItemsLocations/ItemType";
import PreferredPayment from "../../components/AddItemsLocations/PreferredPayment";
import QuantityButton from "../../components/AddItemsLocations/QuantityButton";
import Button from "../../components/UI/Button";
import { Colors } from "../../constants/colors";
import ImageUpload from "./ImageUpload";
import { useAtom } from "jotai";
import { isLoading } from "../../store/AddItemLoading/AddItemLoading";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { ScrollView } from "react-native-gesture-handler";
function AddItemBody() {
  const [loading, setLoading] = useAtom(isLoading);
  const navigation = useNavigation();

  const { mutate, error } = useMutation(createResidentListing, {
    onSuccess: onSuccessHandler,
    onError: onErrorHandler,
  });
  const [itemName, setItemName] = useState("");
  const [itemPrice, setPrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [itemWeight, setWeight] = useState("");
  const [itemType, setType] = useState("");
  const [details, setDetails] = useState("");
  const [address, setAddress] = useState("");
  const [streetName, setStreetName] = useState("");
  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [itemNameFlag, setItemNameFlag] = useState(false);
  const [priceFlag, setPriceFlag] = useState(false);
  const [quantityFlag, setQuantityFlag] = useState(false);
  const [weightFlag, setWeightFlag] = useState(false);
  const [addressFlag, setAddressFlag] = useState(false);
  const [streetFlag, setStreetFlag] = useState(false);
  const [buildingFlag, setBuildingFlag] = useState(false);
  const [floorFlag, setFloorFlag] = useState(false);
  const [descriptionFlag, setDescriptionFlag] = useState(false);
  const [imageFlag, setImageFlag] = useState(false);
  const [typeFlag, setTypeFlag] = useState(false);
  const [preferredPaymentFlag, setPreferredPaymentFlag] = useState(false);

  function onSuccessHandler() {
    setLoading(false);

    const parent = navigation.getParent("bottomTab");

    parent.navigate("Home", {
      screen: "TravelerorResident",
      params: { screen: "Travelerr", params: { load: true } },
    });

    // parent.navigate("Home", {
    // 	loading: true
    // })
  }
  function onErrorHandler() {
    setLoading(false);

    Toast.show({
      type: "error",
      text1: "Unfortunately, Your listing has not been added.",
      text2: "Please try to reduce the image size and/or resoultution",
    });
  }

  function handleImageSelect(image) {
    setSelectedImage(image);
    setImageFlag(false);
  }
  const handleInputName = (text) => {
    setItemName(text);
    setItemNameFlag(false);
  };
  const handleInputPrice = (text) => {
    setPrice(text);
    setPriceFlag(false);
  };

  const updateQuantity = (newQuantity) => {
    setQuantity(newQuantity);
    setQuantityFlag(false);
  };

  const handleInputWeight = (text) => {
    setWeight(text);
    setWeightFlag(false);
  };
  const handleType = (option) => {
    setType(option);
    setTypeFlag(false);
  };

  const handleDetails = (text) => {
    setDetails(text);
    setDescriptionFlag(false);
  };
  const handleAddress = (text) => {
    setAddress(text);
    setAddressFlag(false);
  };
  const handleStreetName = (text) => {
    setStreetName(text);
    setStreetFlag(false);
  };
  const handleBuilding = (text) => {
    setBuilding(text);
    setBuildingFlag(false);
  };

  const handleFloor = (text) => {
    setFloor(text);
    setFloorFlag(false);
  };
  function handlePaymentMethod(option) {
    setSelectedOption(option);
    setPreferredPaymentFlag(false);
  }
  let type = "";

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
      type = "Others";
  }
  let PreferredPaymentMethod = "";

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
      PreferredPaymentMethod = "Cash";
  }

  function handleAddItem() {
    let allConditionsMet = true;

    if (itemName === "") {
      setItemNameFlag(true);
      allConditionsMet = false;
    }
    if (itemPrice === "") {
      setPriceFlag(true);
      allConditionsMet = false;
    }
    if (itemWeight === "") {
      setWeightFlag(true);
      allConditionsMet = false;
    }
    if (address === "") {
      setAddressFlag(true);
      allConditionsMet = false;
    }
    if (streetName === "") {
      setStreetFlag(true);
      allConditionsMet = false;
    }
    if (building === "") {
      setBuildingFlag(true);
      allConditionsMet = false;
    }
    if (floor === "") {
      setFloorFlag(true);
      allConditionsMet = false;
    }
    if (details === "") {
      setDescriptionFlag(true);
      allConditionsMet = false;
    }
    if (selectedImage === undefined) {
      setImageFlag(true);
      allConditionsMet = false;
    }
    if (itemType === "") {
      setTypeFlag(true);
      allConditionsMet = false;
    }
    if (selectedOption === "") {
      setPreferredPaymentFlag(true);
      allConditionsMet = false;
    }
    if (quantity === 0) {
      setQuantityFlag(true);
      allConditionsMet = false;
    }

    if (allConditionsMet) {
      addTheItem();
    }
  }

  const addTheItem = async () => {
    setLoading(true);
    // const user = await AsyncStorage.getItem("userID");
    const name = itemName.toString();
    const price = parseInt(itemPrice);
    //quantity
    const approximateWeight = parseInt(itemWeight);
    const productType = type.toString();
    const description = details.toString();
    const cityOfResidence =
      address + " " + streetName + " " + building + " " + floor;
    const paymentMethod = PreferredPaymentMethod;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("cityOfResidence", cityOfResidence);
    formData.append("approximateWeight", approximateWeight);
    formData.append("productType", productType);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("paymentMethod", paymentMethod);

    for (let i = 0; i < selectedImage.length; i++) {
      formData.append("images", selectedImage[i]);
    }

    //console.log("Loading in add item", loading);
    mutate(formData);
  };

  return (
    <View style={{ paddingHorizontal: 20, flex: 1 }}>
      <Text style={styles.textHead}>Product Name</Text>
      <TextInput
        style={
          itemNameFlag == false
            ? styles.inputT
            : [styles.inputT, styles.inputTError]
        }
        onChangeText={handleInputName}
        value={itemName}
        maxLength={70}
      />
      <Text style={styles.textHead}>Product image</Text>
      <View style={styles.imageS}>
        <ImageUpload
          onSelectImage={handleImageSelect}
          style={imageFlag && [styles.inputDetailsError, { borderWidth: 1 }]}
        />
      </View>
      {/* Price View */}
      <Text style={[styles.textHead, { marginTop: 20 }]}>Price</Text>

      <TextInput
        style={
          priceFlag == false
            ? styles.inputT
            : [styles.inputT, styles.inputTError]
        }
        keyboardType="number-pad"
        maxLength={5}
        onChangeText={handleInputPrice}
        value={itemPrice}
      />
      <View>
        <Text style={styles.textHead}>Quantity</Text>
        <TextInput
          style={
            quantityFlag == false
              ? styles.inputT
              : [styles.inputT, styles.inputTError]
          }
          keyboardType="number-pad"
          maxLength={5}
          onChangeText={updateQuantity}
          value={quantity}
        />
      </View>
      <View>
        <Text style={styles.textHead}>Weight</Text>
        <TextInput
          style={
            weightFlag == false
              ? styles.inputT
              : [styles.inputT, styles.inputTError]
          }
          keyboardType="number-pad"
          maxLength={5}
          onChangeText={handleInputWeight}
          value={itemWeight}
        />
        {/* </View> */}
      </View>
      {/* </View> */}

      {/* Type */}
      <View style={{ marginTop: 20 }}>
        <Text
          style={
            typeFlag == false
              ? [styles.textHead, { marginBottom: 6 }]
              : [styles.textHead, { marginBottom: 6, color: "red" }]
          }
        >
          Type
        </Text>
        <ItemType onSelect={handleType} />
      </View>

      {/* More Details,Location */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.textHead}>Product Description</Text>
        <InputBorderStyle
          onChangeText={handleDetails}
          style={descriptionFlag && styles.inputDetailsError}
        />
        {/* <Text style={styles.textHead}>Location</Text> */}
        <Text style={styles.textHead}>City</Text>
        <InputBorderStyle
          onChangeText={handleAddress}
          style={addressFlag && styles.inputDetailsError}
        />
        <Text style={styles.textHead}>Street Name</Text>
        <InputBorderStyle
          onChangeText={handleStreetName}
          style={streetFlag && styles.inputDetailsError}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={[styles.textHead, { width: 250 }]}>Building</Text>
            <InputBorderStyle
              onChangeText={handleBuilding}
              style={buildingFlag && styles.inputDetailsError}
            />
          </View>
          <View style={{}}>
            <Text style={[styles.textHead, { width: 60 }]}>Floor</Text>
            <InputBorderStyle
              keyboardType="number-pad"
              maxLength={4}
              onChangeText={handleFloor}
              style={floorFlag && styles.inputDetailsError}
            />
          </View>
        </View>
      </View>
      <Text style={styles.textHead}>Preferred Payment Method</Text>

      <PreferredPayment
        onSelectOption={handlePaymentMethod}
        style={preferredPaymentFlag && styles.inputDetailsError}
      />

      {!loading && (
        <Button style={styles.button} onPress={handleAddItem}>
          Add Item
        </Button>
      )}
      {loading && (
        <Button style={styles.button}>
          <ActivityIndicator size="small" color={Colors.lightGreen} />
        </Button>
      )}
    </View>
  );
}

export default AddItemBody;

const styles = StyleSheet.create({
  textHead: {
    //color: Colors.darkGreen,
    fontSize: 18,
    fontFamily: "inter-regular",
    marginTop: 10,
  },
  inputT: {
    fontFamily: "inter-regular",
    color: Colors.black,
    fontSize: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: Colors.gray,
    borderWidth: 1,
    //borderColor: "#E6E6E6",
    //paddingVertical: 6,
    borderRadius: 5,
    //paddingHorizontal: 4,
    padding: 4,
    marginVertical: 5,
    borderColor: Colors.lightGray,
  },
  inputTError: {
    borderWidth: 1.5,
    borderColor: Colors.errorRedDark,
  },
  inputDetailsError: {
    borderColor: Colors.errorRedDark,
    borderWidth: 1,
  },
  textL: {
    //color: Colors.darkGreen,
    fontFamily: "inter-light",
  },
  button: {
    width: "80%",
    margin: 10,
    marginTop: -10,
  },
  imagepreviewcontainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 200,
    backgroundColor: "#f0cced",
    marginVertical: 8,
    borderRadius: 8,
  },
  previewText: {
    color: "#592454",
  },
  // imageS: {
  //   position: "absolute",
  //   right: 100,
  //   top: 70,
  //   right: 20,
  // },
});
