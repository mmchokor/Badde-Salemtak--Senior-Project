import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { Colors } from "../../constants/colors";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { Entypo } from "@expo/vector-icons";

import {
  launchCamera,
  launchImageLibrary,
  launchImageLibraryAsync,
} from "react-native-image-picker";

const options = {
  title: "Select Image",
  type: "library",
  options: {
    maxHeight: 200,
    maxWidth: 200,
    selectionLimit: 1,
    mediaType: "photo",
    includeBase64: false,
  },
};

function ImageUpload({ onSelectImage, style }) {
  const [image, setImage] = useState("");
  const [imageForm, setImageForm] = useState([]);
  const [formArray, setFormArray] = useState([]);
  const [imageSelected, setImageSelected] = useState(false);

  //let imagePreview = <Text style={styles.previewText}>Upload Image</Text>;
  let imagePreview = (
    <Entypo
      name="camera"
      size={24}
      style={[styles.previewText, { color: Colors.darkGreen }]}
    />
  );

  async function openGallery() {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //allowsEditing: true,
      allowsMultipleSelection: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!image.canceled) {
      setImageSelected(true);
      setImage(image);
      const newFormArray = image.assets.map((asset) => {
        const form = {
          uri: asset.uri,
          type:
            asset.type +
            "/" +
            asset.uri.substring(asset.uri.lastIndexOf(".") + 1),
          name: asset.uri.substring(asset.uri.lastIndexOf("/") + 1),
        };

        return form;
      });

      setFormArray((prev) => [...prev, ...newFormArray]);

      const fileInfo = await FileSystem.getInfoAsync(image.assets[0].uri);

      const fileSize = fileInfo.size; // size of the file in bytes
      const lastModified = fileInfo.modificationTime; // date and time when the file was last modified

      //onSelectImage(formArray);
      onSelectImage([...formArray, ...newFormArray]);
    }
  }
  if (image) {
    //console.log(image)
    // imagePreview = (
    //   // <Image source={{ uri: image.assets[0].uri }} style={styles.imageStyle} />
      
    // );
   // {image.assets.map((image) => <Image source={{ uri: image.uri }} style={styles.imageStyle} />)}
   return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
      {image.assets.map((image) => <Image key={Math.random()} source={{ uri: image.uri }} style={styles.imageStyle} />)}
      <Pressable
          onPress={openGallery}
          style={({ pressed }) => (pressed ? [styles.pressed] : [])}
        >
          <View style={[styles.imagepreviewcontainerBlock, style]}>
            {imagePreview}
            <Text style={styles.uploadImgText}>Upload Image</Text>
          </View>
        </Pressable>
    </View>
   )
  }

  return (
    
    <View>
      <View>
        <Pressable
          onPress={openGallery}
          style={({ pressed }) => (pressed ? [styles.pressed] : [])}
        >
          <View style={[styles.imagepreviewcontainer, style]}>
            {imagePreview}
            <Text style={styles.uploadImgText}>Upload Image</Text>
          </View>
        </Pressable>
      </View>
      <Pressable
        style={({ pressed }) =>
          pressed ? [styles.pressedDelete] : [styles.deleteI]
        }
        onPress={() => setImage("")}
      >
        {/* <MaterialCommunityIcons
          name="delete"
          size={24}
          color={Colors.errorRedDark}
        /> */}
      </Pressable>
    </View>
  );
}

export default ImageUpload;

const styles = StyleSheet.create({
  imagepreviewcontainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 200, //may be 90
    //width: 150,
    //backgroundColor: "#c7c7c7",
    marginVertical: 8,
    borderRadius: 10,
    //backgroundColor: Colors.white,
    //backgroundColor: "#ecfef8",
    borderWidth: 1,
    //borderColor: Colors.darkGreen
    //borderColor: "#E6E6E6",
    borderColor: Colors.lightGray,
  },
  imagepreviewcontainerBlock: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.lightGray,
    height: 100,
    flex: 1,
    width: 100
  },
  previewText: {
    color: Colors.white,
  },
  imageStyle: {
    height: 100, //may be 90
    width: 100,
    borderRadius: 8,
    borderRadius: 10,
    marginRight: 3,
    marginBottom: 5
  },
  deleteI: {
    opacity: 1,
    position: "absolute",
    left: 68,
    top: 72,
  },
  pressedDelete: {
    opacity: 0.75,
    position: "absolute",
    left: 68,
    top: 72,
  },
  uploadImgText: {
    marginTop: 10,
    fontFamily: "inter-light",
    color: Colors.darkGreen,
  },
});
