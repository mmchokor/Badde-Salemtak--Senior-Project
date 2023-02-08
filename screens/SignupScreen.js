import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../constants/colors'
import SignUp from '../components/SignUp/SignUp'

const SignupScreen = () => {
  return (
    <View style={styles.wrapper}>
        <SignUp />
    </View>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    
})