import { View, StyleSheet } from "react-native";
import CountryFlag from "react-native-country-flag";
import {flags} from './flags';
function CFlag({ country ,s}) {

	return <View><CountryFlag isoCode={flags[country]} size={s}/></View>;
}

export default CFlag;

const styles = StyleSheet.create({});
