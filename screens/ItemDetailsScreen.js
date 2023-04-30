import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Colors } from "../constants/colors";
import ButtonItemType from "../components/AddItemsLocations/ButtonItemType";
import BorderStyle from "../components/AddItemsLocations/BorderStyle";
import MyText from "../components/UI/MyText";
import DetailsBody from "../components/DetailsItemLocation/DetailsBody";
import Weight from "../components/DetailsItemLocation/Weight";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "react-query";
import { getResidentListingById } from "../api/residentListingsAPI";
import LoadingIcon from "../components/Loading/LoadingIcon";
import { useState } from "react";
import Swiper from "react-native-swiper";
import YourImage from "../components/UI/MyImage";
import GalleryModal from "../components/UI/GalleryModal";

function ItemDetailsScreen({ route }) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const username = route.params.username;
  //const image = route.params.imageSrc;
  const price = route.params.price;
  const title = route.params.title;
  const location = route.params.location;
  const listingId = route.params.id;
  const userId = route.params.userId;


  const { data: ResidentListing, isLoading } = useQuery(
    ["Resident", listingId],
    () => getResidentListingById(listingId)
  );

  if (isLoading) {
    return <LoadingIcon />;
  }
  const image = ResidentListing.images[0];

  function chatHandler() {
    navigation.navigate("chat", { username });
  }
  // function offerHandler() {
  //   navigation.navigate("offerRecieved", { username, image, price, title, location });
  // }
  // I changed the location after the button is clicked to this instead of the other one.
  function offerHandler() {
    navigation.navigate("makeOffer", {
      username,
      image,
      price,
      title,
      location,
      listingId,
    });
  }

  return (
      <View>
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
                    style={{
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <Pressable onPress={() => setModalVisible(true)}>
                      <Image source={{ uri: image }} style={styles.itemPhoto} />
                    </Pressable>
                    <View style={{ marginTop: 10 }}>
                      <ButtonItemType text={route.params.type} />
                    </View>
                  </View>
                  <View>
                    {/* Title */}
                    <MyText style={styles.textTitle}>
                      {route.params.title}
                    </MyText>
                    {/* Price */}
                    <Text style={styles.priceText}>
                      USD {route.params.price}
                    </Text>

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
              <View style={styles.body}>
                <DetailsBody
                  details={route.params.moreD}
                  location={route.params.location}
                  username={route.params.username}
                  payment={route.params.prefPayment}
                  userId={userId}
                />
                <View style={styles.btnWrapper}>
                  <Pressable
                    onPress={chatHandler}
                    style={({ pressed }) => {
                      opacity: 0.75;
                    }}
                  >
                    <View style={styles.confirmBtn}>
                      <Text style={styles.confirmText}>Chat Now</Text>
                    </View>
                  </Pressable>
                  <Pressable
                    onPress={offerHandler}
                    style={({ pressed }) => {
                      opacity: 0.75;
                    }}
                  >
                    <View style={[styles.confirmBtn, styles.paymentBtn]}>
                      <Text style={styles.confirmText}>Make Offer</Text>
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <View style={styles.centeredView}>
        <GalleryModal images={ResidentListing.images} modalVisible={modalVisible} setModalVisible={setModalVisible} />
      </View>
      </View>
      
   
  );
}

export default ItemDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingTop: 15,
    paddingBottom: 15,
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
    backgroundColor: "#FFC300",
  },
  body: {
    marginTop: 1,
    backgroundColor: Colors.grayBackground,
    paddingHorizontal: 10,
    borderRadius: 10,
    //paddingBottom: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //marginTop: 22,
  },
  modalView: {
    //margin: 20,
    backgroundColor: "black",
    borderRadius: 20,
    //padding: 35,
    alignItems: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  // container: {
  //   flex: 1,
  // },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
