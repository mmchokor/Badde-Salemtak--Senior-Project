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
  import { getPendingDeliveryForTraveller } from "../api/orderAPI";
  import LoadingIcon from "../components/Loading/LoadingIcon";
  import { formatDate } from "../constants/FormatDate";
  import RenderOrder from "../components/Orders/RenderOrder";
  
  function MyDeliveriesScreen() {
    const [selectedButton, setSelectedButton] = useState("Pending");
    const {
      data: Pending,
      isFetching,
      isLoading,
      refetch
    } = useQuery("Pending", getPendingDeliveryForTraveller);
  
    if (isFetching || isLoading) {
      return <LoadingIcon />;
    }


  
    const handleButtonPress = (buttonName) => {
      setSelectedButton(buttonName);
    };
  
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
        <FlatList
          data={Pending.pendingOrders}
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
  