import { View, StyleSheet,Text } from "react-native";

import BorderStyle from "../AddItemsLocations/BorderStyle";
import {FontAwesome5} from '@expo/vector-icons';
function Weight({value}) {
	return (
		<View>
			<BorderStyle>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						margin: 2,
					}}
				>
					<Text
						style={{
							fontSize: 14,
							opacity: 0.7,
							fontFamily: "inter-light",
							marginRight: 3,
						}}
					>
						{value} g
					</Text>
					<FontAwesome5 name='weight-hanging' size={15} />
				</View>
			</BorderStyle>
		</View>
	);
}
export default Weight;

const styles = StyleSheet.create({});
