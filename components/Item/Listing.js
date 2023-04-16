import { Image, Pressable, StyleSheet, View, Dimensions } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants/colors";
import MyText from "../UI/MyText.js";
import ListingOptions from "../Listings/ListingOptions";
import ListingDetails from "../Listings/ListingDetails";
import moment from "moment";

const height = Dimensions.get("window").height;

const Listing = ({
  id,
  title,
  location,
  rating,
  type,
  price,
  quantity,
  weight,
  username,
  imageSrc,
  timePosted,
  moreD,
  prefPayment,
  FavId,
  onPress,
}) => {
//   const hour = Math.abs(new Date().getHours() - timePosted.substring(11, 13));
//   const day = Math.abs(new Date().getDay() - timePosted.substring(8, 10));

  const [startDate, setStartDate] = useState(moment(timePosted));
  const [endDate, setEndDate] = useState(moment());

  const diffInMilliseconds = endDate.diff(startDate); // difference in milliseconds
  const diffInMinutes = Math.floor(diffInMilliseconds / 60000); // difference in minutes
  const diffInHours = Math.floor(diffInMilliseconds / 3600000); // difference in hours
  const diffInDays = Math.floor(diffInMilliseconds / 86400000); // difference in days

  let diffText = "";
  if (diffInDays > 0) {
    diffText = `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
  } else if (diffInHours > 0) {
    diffText = `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  } else if (diffInMinutes > 0) {
    diffText = `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
  } else {
    diffText = "just now";
  }

  // console.log("The date from backend" + timePosted)
  // console.log("new date " + new Date().toISOString())

  // if (imageSrc === '') {
  //   return
  // }

  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? [styles.pressed, styles.wrapper] : styles.wrapper
      }
      onPress={onPress}
    >
      {/* <ListingOptions /> */}
      <View style={styles.contentWrapper}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={{ uri: imageSrc !== "" ? imageSrc : undefined }}
          />
        </View>
        <View style={styles.sectionWrapper}>
          <View style={styles.headerWrapper}>
            <MyText style={styles.header}>{title}</MyText>
            <ListingOptions
              id={id}
              title={title}
              location={location}
              rating={4}
              type={type}
              price={price}
              quantity={quantity}
              weight={weight}
              username={username}
              imageSrc={imageSrc}
              timePosted={timePosted}
              moreD={moreD}
              prefPayment={prefPayment}
              FavId={FavId}
            />
          </View>
          <View style={styles.bodyWrapper}>
            <ListingDetails
              location={location}
              rating={rating}
              type={type}
              price={price}
            />
            <View style={styles.footerWrapper}>
              <View style={styles.profileWrapper}>
                <View style={styles.profileImg}></View>
                <MyText style={styles.username}>{username}</MyText>
              </View>
              <MyText style={[styles.detail, styles.time]}>
                {/* {day < 1 ? `${hour} hours ago` : `${day} days ago`} */}
				{diffText}
              </MyText>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default Listing;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    //height: 160, was 200
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginVertical: 2.5,
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
  },

  bodyWrapper: {
    marginTop: 12,
    flex: 1,
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
});
