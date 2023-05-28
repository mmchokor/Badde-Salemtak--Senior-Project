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
import {
  getPendingDeliveryForTraveller,
  getCompletedDeliveries,
} from "../api/orderAPI";
import LoadingIcon from "../components/Loading/LoadingIcon";
import { formatDate } from "../constants/FormatDate";
import RenderOrder from "../components/Orders/RenderOrder";

function MyDeliveriesScreen({route}) {
  const [selectedButton, setSelectedButton] = useState("Pending");
  const {
    data: Pending,
    isFetching,
    isLoading,
    refetch,
  } = useQuery("Pending", getPendingDeliveryForTraveller);

  const { data: completed, isFetching: completedIsFetching, isLoading: completedIsLoading } = useQuery(
    ["completed", selectedButton],
    getCompletedDeliveries, {cacheTime: 0, refetchInterval: 0, staleTime: 0}
  );

  if (isFetching || isLoading || completedIsFetching || completedIsLoading) {
    return <LoadingIcon />;
  }

  const handleButtonPress = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const deliveredOutputList = (
    <FlatList
      data={completed}
      showsVerticalScrollIndicator={false}
      refreshing={completedIsFetching}
      onRefresh={() => refetch()}
      renderItem={({ item }) => {
        return (
          <RenderOrder
            deliveryDate={formatDate(item.date)}
            assigned={item.user}
            listingName={item.listing.name}
            deliveryScreen={true}
            deliveryFee={item.deliveryFee}
            message={item.message}
            price={item.listing.price}
            orderId={item.id}
            delivered={true}
            
          />
        );
      }}
      keyExtractor={(item) => item._id}
    />
  );
  const pendingOutputList = (
    <FlatList
      data={Pending.pendingOrders.reverse()}
      showsVerticalScrollIndicator={false}
      refreshing={isFetching}
      onRefresh={() => refetch()}
      renderItem={({ item }) => {
        return (
          <RenderOrder
            deliveryDate={formatDate(item.date)}
            assigned={item.listing.user}
            listingName={item.listing.name}
            deliveryScreen={true}
            deliveryFee={item.deliveryFee}
            message={item.message}
            price={item.listing.price}
            orderId={item.id}
            
          />
        );
      }}
      keyExtractor={(item) => item._id}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: Colors.white }]}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === "Pending" && styles.selectedButton,
          ]}
          onPress={() => handleButtonPress("Pending")}
        >
          <Text
            style={[
              styles.textN,
              selectedButton === "Pending" && styles.selectedText,
            ]}
          >
            Pending
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === "Delivered" && styles.selectedButton,
          ]}
          onPress={() => handleButtonPress("Delivered")}
        >
          <Text
            style={[
              styles.textN,
              selectedButton === "Delivered" && styles.selectedText,
            ]}
          >
            Delivered
          </Text>
        </TouchableOpacity>
      </View>
      {selectedButton == "Pending" ? pendingOutputList : deliveredOutputList}
    </View>
  );
}

export default MyDeliveriesScreen;

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
