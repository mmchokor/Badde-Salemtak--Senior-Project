import React from "react";
import { View, Modal, Image, StyleSheet, Text } from "react-native";
import Swiper from "react-native-swiper";
import { Colors } from "../../constants/colors";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

const GalleryModal = ({ images, modalVisible, setModalVisible }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      animationOut={'slideOutDown'}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pressable onPress={() => setModalVisible(!modalVisible)} style={{alignSelf: "flex-end",marginRight: 30}}>
            <Text
              style={{
                color: Colors.darkGreen,
                alignSelf: "flex-end",
                //marginRight: 30,
                fontSize: 18,
              }}
            >
              Close
            </Text>
          </Pressable>
          <View style={styles.container}>
            <Swiper
              showsPagination={true}
              progressiveRenderingEnabled={true}
              loadMinimal={true}
              loadMinimalSize={2}
              removeClippedSubviews={false}
              activeDotColor={Colors.darkGreen}
            >
              {images.map((image, index) => (
                <View style={styles.slide} key={index}>
                  <Image style={styles.image} source={{ uri: image }} />
                </View>
              ))}
            </Swiper>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GalleryModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //marginTop: 22,
  },
  modalView: {
    //margin: 20,
    backgroundColor: "black",
    //borderRadius: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: 15,
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
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    // width: 600,
    // height: 600,
    resizeMode: "contain",
  },
});
