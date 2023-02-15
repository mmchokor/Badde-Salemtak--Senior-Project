import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MyText from "../UI/MyText";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

const ListingDetails = ({ location, rating, type, price }) => {
  return (
    <View style={styles.wrapper}>
      <View>
        <MyText style={styles.detail}>
          <Entypo name="location-pin" size={12} color="red" />
          {location}
        </MyText>
        <MyText style={[styles.detail, styles.opaque]}>
          <Entypo name="star" size={12} color="black" />
          {rating}
        </MyText>
      </View>
      <View style={{marginLeft: 30}}>
        <MyText style={[styles.detail, styles.opaque]}>
          {/* medicine */}
          {type === "Medicine" && (
            <FontAwesome5 name="pills" size={12} color="black" />
          )}
          {/* electronics */}
          {type === "Electronics" && (
            <Ionicons name="phone-portrait-outline" size={12} color="black" />
          )}
          {/* clothes */}
          {type === "Clothes" && (
            <Ionicons name="shirt-outline" size={12} color="black" />
          )}
          {/*  food */}
          {type === "Food" && (
            <Ionicons name="fast-food-outline" size={12} color="black" />
          )}
          {/* {accessories} */}
          {type === "Accessories" && (
            <Feather name="watch" size={12} color="black" />
          )}
          {type}
        </MyText>
        <MyText style={[styles.detail, styles.price]}>${price}</MyText>
      </View>
    </View>
  );
};

export default ListingDetails;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'row',
        //justifyContent: 'space-around'
    },  
  detail: {
    marginVertical: 1,
    fontSize: 12,
  },
  price: {
    fontSize: 12,
    color: Colors.darkGreen,
    fontFamily: "inter-bold",
  },
  opaque: {
    opacity: 0.6
  }
});
