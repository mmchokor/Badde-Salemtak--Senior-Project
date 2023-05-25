import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Colors } from "../constants/colors";
import { useState } from "react";
import { useQuery } from "react-query";
import { getAcceptedOrdersByUser } from "../api/orderAPI";
import LoadingIcon from "../components/Loading/LoadingIcon";
import { formatDate } from "../constants/FormatDate";
import RenderOrder from '../components/Orders/RenderOrder'

function MyOrderScreen() {
  const [selectedButton, setSelectedButton] = useState("In Transit");
  const {
    data: inTransit,
    isFetching,
    isLoading,
  } = useQuery("inTransit", getAcceptedOrdersByUser);

  if (isFetching) {
    return <LoadingIcon />;
  }

  //console.log(inTransit.acceptedOrders[0])

  const handleButtonPress = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors.white }]}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === "In Transit" && styles.selectedButton,
          ]}
          onPress={() => handleButtonPress("In Transit")}
        >
          <Text
            style={[
              styles.textN,
              selectedButton === "In Transit" && styles.selectedText,
            ]}
          >
            In Transit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === "Received" && styles.selectedButton,
          ]}
          onPress={() => handleButtonPress("Received")}
        >
          <Text
            style={[
              styles.textN,
              selectedButton === "Received" && styles.selectedText,
            ]}
          >
            Received
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={inTransit.acceptedOrders}
        renderItem={({ item }) => {
          return (
            <RenderOrder
              deliveryDate={formatDate(item.date)}
              assigned={item.user}
              listingName={item.listing.name}
              deliveryFee={item.deliveryFee}
              message={item.message}
              price={item.listing.price}
              orderId={item.id}
            />
          );
        }}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

export default MyOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 6,
    paddingTop: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 25,
  },
  button: {
    backgroundColor: Colors.white,
    padding: 9,
    paddingHorizontal: 18,
    borderRadius: 16,
    borderWidth: 0.6,
    borderColor: Colors.darkGreen,
  },
  textN: {
    fontFamily: "inter-regular",
    color: Colors.black,
  },
  selectedButton: {
    backgroundColor: Colors.darkGreen,
  },
  selectedText: {
    color: Colors.white,
    fontFamily: "inter-regular",
  },
});
