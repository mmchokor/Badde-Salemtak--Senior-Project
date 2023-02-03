import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
  
      <Text>Open Here</Text>
       <Text>Open There</Text>
       <Text>Open There</Text>
       <Text>Open There</Text>
       <Text>Open There</Text>
       <Text>Open There</Text>
       <Text>Open There</Text>
       <Text>Open There</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
