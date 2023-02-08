import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MyText = ({children, style, onPress}) => {
  return (
    <Text onPress={onPress} style={[styles.fontf, style]}>{children}</Text>
  )
}

export default MyText

const styles = StyleSheet.create({
    fontf: {
        fontFamily: 'inter-regular'
    }
})