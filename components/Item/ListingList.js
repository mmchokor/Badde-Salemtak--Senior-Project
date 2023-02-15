import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import Listing from "./Listing";

const DUMMY_DATA = [
  {
    id: "u1",
    title: "Panadol Extra and the blue one",
    location: "Beirut",
    rating: 4.5,
    type: "Food",
    price: "15",
    username: "Rami",
    imageSrc: require(`../../assets/ItemImages/Panadol.png.webp`),
    timePosted: '12 hours ago'
  },
  {
    id: "u2",
    title: "Takis",
    location: "Sidon",
    rating: 1.2,
    type: "Accessories",
    price: "15",
    username: "Chokor",
    imageSrc: require(`../../assets/ItemImages/takis.jpeg`),
    timePosted: '12 hours ago'
  },
  {
    id: "u3",
    title: "M1 Macbook air",
    location: "Chouf",
    rating: 4.5,
    type: "Electronics",
    price: "1000",
    username: "Nabil",
    imageSrc: require(`../../assets/ItemImages/laptop.jpeg`),
    timePosted: '12 hours ago'
  },
  {
    id: "u4",
    title: "IPhone",
    location: "Beirut",
    rating: 4.5,
    type: "Electronics",
    price: "799",
    username: "Karam",
    imageSrc: require(`../../assets/ItemImages/iphone.jpg.webp`),
    timePosted: '12 hours ago'
  },
];

const ListingList = () => {
  return (
    <View style={styles.wrapper}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={DUMMY_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Listing
            id={item.id}
            title={item.title}
            location={item.location}
            rating={item.rating}
            type={item.type}
            price={item.price}
            username={item.username}
            imageSrc={item.imageSrc}
            timePosted={item.timePosted}
          />
        )}
      />
    </View>
  );
};

export default ListingList;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginHorizontal: 4 //15
  },
});
