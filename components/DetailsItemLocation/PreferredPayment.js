import { View,Text,StyleSheet ,Image} from "react-native";

function PreferredPayment({text}){
    
	const types = {
		1: require("../../assets/PaymentsLogos/cash-on-delivery-steacker-free-vector.webp"),
		2: require("../../assets/PaymentsLogos/Western-Union-Logo-768x432.png"),
		3: require("../../assets/PaymentsLogos/Artboard10.jpg"),
	};
	const payment = () => {
		if (text === "cod") {
			return (
				<Image
					source={Object.values(types)[0]}
					style={{ width: 80, height: 40 }}
				/>
			);
		} else if (text === "cre") {
			return (
				<Image
					source={Object.values(types)[2]}
					style={{ width: 80, height: 40 }}
				/>
			);
		} else if (text === "wes") {
			return (
				<Image
					source={Object.values(types)[1]}
					style={{ width: 80, height: 40 }}
				/>
			);
		} else {
			return (
				<Image
					source={Object.values(types)[0]}
					style={{ width: 80, height: 40 }}
				/>
			);
		}
	};
    return (
        <View>
{payment()}
        </View>
    );
}
export default PreferredPayment;

const styles = StyleSheet.create({
    
})