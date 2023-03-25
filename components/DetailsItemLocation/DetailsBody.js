import { View, Text, StyleSheet, Image, Pressable } from "react-native";

import { Colors } from "../../constants/colors";
import BorderStyle from "../AddItemsLocations/BorderStyle";
import { FontAwesome } from "@expo/vector-icons";
import PreferredPayment from "./PreferredPayment";
import { useNavigation } from "@react-navigation/native";
function DetailsBody({
  details,
  location,
  username,
  payment
}) {
  const navigation = useNavigation();

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
});
