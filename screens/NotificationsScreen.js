import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";


function NotificationsScreen({navigation}) {

	const viewOfferHandler = () => {
		navigation.navigate('Homee', {screen: 'Home', params:{screen: 'ItemDetails'}})
	}

  return (
    <View>
      <View style={styles.cardWrapper}>
        <View style={styles.profileImg}></View>
        <View style={styles.contentWrapper}>
          <Text style={styles.text}>You have received an offer from 
			<Text style={styles.username}> Rami ElSkakini!</Text>
		  </Text>
          <Text style={styles.timeReceived}>5 min ago</Text>
		  <View style={styles.buttonWrapper}>
				<Pressable style={[styles.button, styles.buttonAccept]} onPress={viewOfferHandler}>
					<Text style={[styles.text, styles.textAccept]}>View Offer</Text>
				</Pressable>
				<Pressable style={styles.button}>
					<Text style={styles.text}>Decline</Text>
				</Pressable>
		  </View>
        </View>
      </View>
    </View>
  );
}

export default NotificationsScreen;

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  contentWrapper: {
	marginLeft: 10
  },
  profileImg: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGreen,
    marginRight: 2,
  },
  timeReceived: {
	fontSize: 12,
	color: Colors.lightGray
  }, 
  username: {
	fontFamily: 'inter-bold',
	color: Colors.darkGreen
  },
  buttonWrapper: {
	flexDirection: 'row',
	marginTop: 10
  },
  button: {
	padding: 8,
	borderRadius: 6,
	borderColor: Colors.lightGray,
	borderWidth: 1,
	marginRight: 5
  },
  buttonAccept: {
	backgroundColor: Colors.darkGreen
  },	
  text: {
	fontSize: 14
  },
  textAccept: {
	color: Colors.white
  }
});
