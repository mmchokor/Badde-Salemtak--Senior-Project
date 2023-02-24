import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Colors } from "../constants/colors";
import ButtonItemType from "../components/AddItemsLocations/ButtonItemType";
import BorderStyle from "../components/AddItemsLocations/BorderStyle";
import MyText from "../components/UI/MyText";
import DetailsBody from "../components/DetailsItemLocation/DetailsBody";
import Weight from "../components/DetailsItemLocation/Weight";

function ItemDetailsScreen({ route }) {
  return (
    <View>
      {/* <Text>Item Details Screen:{route.params.id}  {route.params.title}</Text> */}

      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.container}>
            <View style={{ paddingBottom: 12, paddingHorizontal: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View
                  style={{ flexDirection: "column", alignItems: "flex-start" }}
                >
                  <Image
                    source={route.params.imageSrc}
                    style={styles.itemPhoto}
                  />
                  <View style={{ marginTop: 10 }}>
                    <ButtonItemType text={route.params.type} />
                  </View>
                </View>
                <View>
                  {/* Title */}
                  <MyText style={styles.textTitle}>{route.params.title}</MyText>
                  {/* Price */}
                  <Text style={styles.priceText}>USD {route.params.price}</Text>

                  {/* Quantity */}
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 8,
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.qTwText}>Quantity </Text>
                    <View>
                      <BorderStyle>
                        <Text
                          style={{
                            fontSize: 14,
                            opacity: 0.7,
                            fontFamily: "inter-light",
                            marginRight: 3,
                          }}
                        >
                          x {route.params.quantity}
                        </Text>
                      </BorderStyle>
                    </View>
                  </View>

                  {/* Weight */}
                  <View style={{ marginTop: 8 }}>
                    <View
                      style={{ alignItems: "center", flexDirection: "row" }}
                    >
                      <Text style={[styles.qTwText, { marginRight: 14 }]}>
                        Weight
                      </Text>
                      <Weight value={route.params.weight} />
                    </View>
                  </View>
                </View>
              </View>
            </View>
            {/* Body */}
            <DetailsBody
              details={route.params.moreD}
              location={route.params.location}
              username={route.params.username}
              payment={route.params.prefPayment}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

export default ItemDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingTop: 15,
  },
  itemPhoto: {
    width: 130,
    height: 130,
    borderRadius: 20,
    marginRight: 20,
  },

  textTitle: {
    fontFamily: "inter-bold",
    color: Colors.black,
    fontSize: 24,
    width: 190,
  },
  priceText: {
    fontFamily: "inter-bold",
    color: Colors.darkGreen,
    fontSize: 18,
    paddingTop: 8,
  },
  qTwText: {
    fontFamily: "inter-regular",
    opacity: 0.9,
    fontSize: 15,
  },
});
