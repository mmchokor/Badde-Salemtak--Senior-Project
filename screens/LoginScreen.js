import { SafeAreaView, StyleSheet, Text, View,StatusBar } from 'react-native'
import React from 'react'
import Login from '../components/Login/Login'
import { Colors } from '../constants/colors'

const LoginScreen = () => {
  return (
    <View style={styles.wrapper}>
   
        <Login />
    </View>
    
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Colors.darkGreen,
        
    },
})