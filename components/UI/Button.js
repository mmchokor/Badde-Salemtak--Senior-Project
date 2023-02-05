import { Pressable, StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { Colors } from "../../constants/colors";

const height = Dimensions.get('window').height

const Button = ({onPress, children}) => {
  return (
    
    <Pressable onPress={onPress} style={({pressed}) => pressed ? styles.pressed : styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </Pressable>
    
  );
};

export default Button;

const styles = StyleSheet.create({
    container: {
        width: '50%',
        alignSelf:'center'
    },
    wrapper: {
        //marginTop: 30,
        marginTop: height < 700 ? 10: 30,
        backgroundColor: Colors.darkGreen,
        //padding: 16,
        padding: Platform.OS === 'ios' ? 16 : 12,
        borderRadius: 28,
    },
    text: {
        color: Colors.white,
        textAlign: 'center',
        //fontSize: 20,
        fontSize: Platform.OS === 'ios' ? 20: 16,
        fontFamily: 'inter-regular'
    },
    pressed: {
        opacity: 0.75,
        alignSelf:'center',
        width: '50%'
    }
});
