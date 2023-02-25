import { Image, Pressable, StyleSheet, View, Dimensions } from "react-native";
import React from "react";
import { Colors } from "../../constants/colors";
import MyText from "../UI/MyText.js";
import ListingOptions from "../Listings/ListingOptions";
import ListingDetails from "../Listings/ListingDetails";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
// iphone 14 HEIGHT 844
// android simulator HEIGHT 683
// my phone Height 755

// iphone 14 Width 390
// android simulator Width 411
// my phone Width 360

const height = Dimensions.get("window").height;

const ResidentListing = ({
  id,
  fromLocation,
  toLocation,
  rating,
  maxWeight,
  username,
  imageSrc,
  timePosted,
  
  onPress,
}) => {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? [styles.pressed, styles.wrapper] : styles.wrapper
      }
      onPress={onPress}
    >
      <View style={styles.contentWrapper}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={imageSrc}
          />
        </View>
        <View style={styles.sectionWrapper}>
          <View style={styles.headerWrapper}>
            <View>
              <View style={styles.iconTextWrapper}>
                <FontAwesome
                  name="paper-plane"
                  size={14}
                  color={Colors.darkGreen}
                />
                <MyText style={styles.header}><MyText style={{opacity: 0.6}}>From:</MyText>{fromLocation}</MyText>
              </View>
              <View style={styles.iconTextWrapper}>
                <Ionicons name="location-sharp" size={14} color="red" />
                <MyText style={styles.header}><MyText style={{opacity: 0.6}}>To:</MyText>{toLocation}</MyText>
              </View>
            </View>
            <ListingOptions id={id} />
          </View>
          <View style={styles.bodyWrapper}>
            <View style={styles.iconTextWrapper}>
              <Entypo name="star" size={12} color="black" />
              <MyText style={[styles.detail, styles.opaque, styles.weight]}>
                {rating}
              </MyText>
            </View>
            <View style={styles.iconTextWrapper}>
              <FontAwesome5
                name="weight-hanging"
                size={12}
                color="black"
                
              />
              <MyText style={[styles.detail, styles.opaque, styles.weight]}>
                Max Weight: {maxWeight}kg
              </MyText>
            </View>
            <View style={styles.footerWrapper}>
              <View style={styles.profileWrapper}>
                <View style={styles.profileImg}></View>
                <MyText style={styles.username}>{username}</MyText>
              </View>
              <MyText style={[styles.detail, styles.time]}>{timePosted}</MyText>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ResidentListing;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    //height: 160, was 200
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginBottom: 5,
    elevation: 3,
  },
  contentWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 2, 
  },
  imageWrapper: {
    paddingHorizontal: 5,
  },
  image: {
    height: 90, //was 100
    width: 90,
    borderRadius: 8,
  },
  sectionWrapper: {
    flex: 1,
    marginTop: height < 700 ? 14 : 17,
    marginLeft: 10,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    width: "80%",
    marginLeft: 5,
  },

  bodyWrapper: {
    marginTop: 12,
    flex: 1,
  },
  iconTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },    
  footerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 10,
    marginBottom: 10,
    marginVertical: 15,
  },
  profileWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImg: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: Colors.lightGreen,
    marginRight: 2,
  },
  username: {
    fontSize: 12,
    fontFamily: "inter-light",
    opacity: 0.4,
  },
  time: {
    fontFamily: "inter-light",
    fontSize: 12,
    opacity: 0.4,
  },
  pressed: {
    opacity: 0.75,
  },
  detail: {
    marginVertical: 1,
    fontSize: 12,
  },
  opaque: {
    opacity: 0.6,
  },
  weight: {
    marginLeft: 5,
  },
});
