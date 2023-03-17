import { View, Text, StyleSheet, Image, Pressable } from "react-native";

import { Colors } from "../../constants/colors";
import BorderStyle from "../AddItemsLocations/BorderStyle";
import { FontAwesome } from "@expo/vector-icons";
import PreferredPayment from "./PreferredPayment";
import { useNavigation } from '@react-navigation/native';
function DetailsBody({ details, location, username, payment }) {
	const navigation = useNavigation();
	function chatHandler () {
		navigation.navigate('chat', {username})
	}
	function paymentHandler () {
		navigation.navigate('productConfirm', {username, details, location})
	}

  return (
    <View>
      <View style={styles.body}>
        {/* More Details */}
        <Text style={styles.textHead}>More Details</Text>
        <BorderStyle style={{ borderRadius: 10 }}>
          <Text style={styles.textBody}>{details}</Text>
        </BorderStyle>

        {/* Location */}
        <Text style={styles.textHead}>Location</Text>
        <BorderStyle>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 4,
            }}
          >
            <Image
              source={require("../../assets/LocationImages/location.png")}
              style={styles.locImage}
            />
            <Text style={styles.textBody}>{location}</Text>
          </View>
          <FontAwesome
            name="location-arrow"
            size={28}
            style={{ left: 320, bottom: 26, position: "absolute" }}
            color={Colors.darkGreen}
            onPress={() => {
              alert("karam was here");
            }}
          />
        </BorderStyle>
        <Text style={styles.textHead}>User Info</Text>
        <BorderStyle>
          <View>
            <Text style={styles.textBody}>{username}</Text>
          </View>
        </BorderStyle>
        <Text style={styles.textHead}>Preferred Payment Method</Text>
        <BorderStyle style={styles.paymentContainer}>
          <PreferredPayment text={payment} />
        </BorderStyle>
        <Pressable onPress={chatHandler} style={({pressed}) => {opacity: 0.75}}>
          <View style={styles.confirmBtn}>
            <Text style={styles.confirmText}>Chat Now</Text>
          </View>
        </Pressable>
        <Pressable onPress={paymentHandler} style={({pressed}) => {opacity: 0.75}}>
          <View style={[styles.confirmBtn, styles.paymentBtn]}>
            <Text style={styles.confirmText}>Make payment</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
export default DetailsBody;

const styles = StyleSheet.create({
  body: {
    marginTop: 1,
    backgroundColor: Colors.grayBackground,
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingBottom: 20,
  },
  textHead: {
    fontFamily: "inter-bold",
    color: Colors.black,
    fontSize: 16,
    width: 220,
    paddingVertical: 6,
  },
  textBody: {
    fontFamily: "inter-regular",
    padding: 4,
  },
  locImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  paymentContainer: {
    marginTop: 5,
    borderColor: Colors.gray,
    borderRadius: 5,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
  confirmBtn: {
    backgroundColor: Colors.darkGreen,
    borderRadius: 21,
    alignItems: "center",
    marginTop: 8,
  },
  confirmText: {
    fontFamily: "inter-bold",
    color: Colors.white,
    fontSize: 20,
    padding: 8,
  },
  paymentBtn: {
    backgroundColor: '#FFC300'
  }
});
