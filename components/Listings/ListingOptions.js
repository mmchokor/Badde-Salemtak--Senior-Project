import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome5 } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Colors } from '../../constants/colors';

const ListingOptions = () => {

  const bookmarkHandler = () => {
    console.log("clicked")
  }
  const optionsHandler = () => {
    console.log("clicked2")
  }

  return (
    <View style={styles.optionsWrapper}>
        <FontAwesome5
          style={styles.optionsIcon}
          name="bookmark"
          size={16}
          color="black"
          onPress={bookmarkHandler}
        />
        <SimpleLineIcons
          style={styles.optionsIcon}
          name="options-vertical"
          size={16}
          color={Colors.gray}
          onPress={optionsHandler}
        />
      </View>
  )
}

export default ListingOptions

const styles = StyleSheet.create({
  optionsWrapper: {
    flexDirection: "row",
    //justifyContent: 'flex-end',
    // marginTop: 5,
    // position: "absolute",
    // left: "86%",
    zIndex: 100,
  },
  optionsIcon: {
    marginHorizontal: 4,
  },
})