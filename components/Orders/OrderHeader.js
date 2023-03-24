import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Entypo } from "@expo/vector-icons";

const OrderHeader = ({title, location}) => {
  return (
    <View style={styles.header}>
    <View style={styles.linkContainer}>
      <Text style={{ width: "95%" }}>
        <Text style={styles.link}>Link to your item: </Text>
        <Text style={styles.linkText}>
          {/* Apple-MacBook-13-inch-Display-Dual-cores */}
          {title}
        </Text>
      </Text>
      <Entypo name="link" size={16} color="black" />
    </View>
    <View style={styles.linkContainer}>
      <Text style={{ width: "95%" }}>
        <Text style={styles.link}>Shipping to: </Text>
        <Text style={styles.linkText}>{location}</Text>
      </Text>
      <Entypo name="location" size={16} color="black" />
    </View>
    <View
      style={{
        borderBottomColor: "black",
        borderBottomWidth: StyleSheet.hairlineWidth,
        opacity: 0.3,
      }}
    />
  </View>
  )
}

export default OrderHeader

const styles = StyleSheet.create({
    header: {
        marginTop: 5,
      },
      linkContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        //flexWrap: "wrap",
      },
      link: {
        fontFamily: "inter-bold",
        fontSize: 14,
      },
      linkText: {
        fontFamily: "inter-light",
        fontSize: 12,
        opacity: "20%",
      },
})