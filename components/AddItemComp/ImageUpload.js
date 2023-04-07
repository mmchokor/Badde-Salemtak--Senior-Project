import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { Colors } from "../../constants/colors";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as FileSystem from 'expo-file-system';

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

function ImageUpload({ onSelectImage }) {
  const [image, setImage] = useState("");
  const [imageForm, setImageForm] = useState([]);

  let imagePreview = <Text style={styles.previewText}>Upload Image</Text>;

  async function openGallery() {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!image.canceled) {
      //onSelectImage(image);
      setImage(image);
      const form = {
        uri: image.assets[0].uri,
        type: image.assets[0].type + "/" + image.assets[0].uri.substring(
			image.assets[0].uri.lastIndexOf(".") + 1),
        //type: "images",
        name: image.assets[0].uri.substring(
          image.assets[0].uri.lastIndexOf("/") + 1
        )
      };

      const fileInfo = await FileSystem.getInfoAsync(image.assets[0].uri);

      const fileSize = fileInfo.size; // size of the file in bytes
      const lastModified = fileInfo.modificationTime; // date and time when the file was last modified

	//   form.size = fileSize;
	//   form.lastModified = lastModified

    //   console.log(`File size: ${fileSize}`);
    //   console.log(`Last modified: ${lastModified}`);


      onSelectImage(form);
    }
  }
  if (image) {
    //console.log(image)
    imagePreview = (
      <Image source={{ uri: image.assets[0].uri }} style={styles.imageStyle} />
    );
  }

  return (
    <View>
      <View>
        <Pressable
          onPress={openGallery}
          style={({ pressed }) => (pressed ? [styles.pressed] : [])}
        >
          <View style={styles.imagepreviewcontainer}>{imagePreview}</View>
        </Pressable>
      </View>
      <Pressable
        style={({ pressed }) =>
          pressed ? [styles.pressedDelete] : [styles.deleteI]
        }
        onPress={() => setImage("")}
      >
        <MaterialCommunityIcons
          name="delete"
          size={30}
          color={Colors.darkGreen}
        />
      </Pressable>
    </View>
  );
}

export default ImageUpload;

const styles = StyleSheet.create({
  imagepreviewcontainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 100, //may be 90
    width: 100,
    borderRadius: 8,
    backgroundColor: "#c7c7c7",
    marginVertical: 8,
    borderRadius: 10,
  },
  previewText: {
    color: Colors.white,
  },
  imageStyle: {
    height: 100, //may be 90
    width: 100,
    borderRadius: 8,
    borderRadius: 10,
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
});
