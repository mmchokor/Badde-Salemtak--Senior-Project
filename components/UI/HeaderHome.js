import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import { isTravScreenAtom } from "../../store/TravResScreen/TravOrRes";
import { useAtom } from "jotai";
import { useNavigation } from "@react-navigation/native";

const HeaderHome = () => {
  const [isTravScreen] = useAtom(isTravScreenAtom);
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        flex: 1,
        //justifyContent: "space-around",
        //marginHorizontal: 10,
        alignItems: "center",
      }}
    >
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#F8F8FA",
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#C3C3C3",
          flex: 1,
          paddingVertical: 5,
          paddingLeft: 5
        }}
        onPress={() => {
            if (isTravScreen) {
              navigation.navigate("SearchScreen");
            } else {
              navigation.navigate("SearchScreenResident");
            }
          }}
      >
        <Ionicons
          name="search-outline"
          size={24}
          color="#818183"
          
          
        />
        <Text style={{color: '#818183', fontFamily: 'inter-regular', fontSize: 16}}>Search for an Item</Text>
      </Pressable>
      <View style={{paddingRight: 25, paddingLeft: 10}} > 
      {/* style={{marginLeft: 20, marginRight: 10}} */}
        <Feather name="message-circle" size={30} color={Colors.darkGreen} />
      </View>
    </View>
  );
};

export default HeaderHome;

const styles = StyleSheet.create({});
