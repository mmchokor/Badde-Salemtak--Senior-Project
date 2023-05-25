import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/colors";
import { useQueries, useQuery } from "react-query";
import { getUserInfoById } from "../../api/userAPI";
import LoadingIcon from "../Loading/LoadingIcon";
import { useNavigation } from "@react-navigation/native";

const RenderOrder = ({ listingName, assigned, deliveryDate, deliveryFee, message, price, orderId }) => {
  const navigation = useNavigation()

  const itemDetailsHandler = () => {
    navigation.navigate('renderOrderDetails', {deliveryFee: deliveryFee, date: deliveryDate, message: message, price:price, orderId:orderId})
  }


  return (
    <TouchableOpacity onPress={itemDetailsHandler}>
      <View style={styles.item}>
        <View style={styles.listInnerContainer}>
          <View style={styles.head}>
            <Text style={styles.listHead}>{listingName}</Text>
            <Text style={styles.orderStatus}>In transit</Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.subHead}>Assigned</Text>
              <Text style={styles.subHead}>Delivery Date</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.subSubHead}>{assigned.firstname + " " + assigned.lastname}</Text>
              <Text style={styles.subSubHead}>{deliveryDate}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RenderOrder;

const styles = StyleSheet.create({
  item: {
    //borderWidth: 1,
    backgroundColor: "#ffffff",
    marginVertical: 3,
    //borderColor: Colors.bottomBarIcons,
    borderRadius: 12,

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, // This is for Android
    borderRadius: 5
  },
  listHead: {
    fontFamily: "inter-medium",
    fontSize: 16,
  },
  listInnerContainer: {
    marginHorizontal: 10,
    marginVertical: 15,
  },
  subHead: {
    fontFamily: "inter-regular",
    fontSize: 12,
    color: Colors.gray,
  },
  subSubHead: {
    fontFamily: "inter-medium",
    fontSize: 15,
    color: Colors.darkGreen,
  },
  head: {
    //margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderStatus: {
    //backgroundColor: "#BCD9F8",
    backgroundColor: '#1ABC9C',
    padding: 5,
    borderRadius: 5,
    fontFamily: "inter-light",
    fontSize: 10,
    color: 'white'
  },
});
