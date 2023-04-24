import {
	FontAwesome,
	SimpleLineIcons,
	MaterialCommunityIcons,
	Feather,
} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import { useMutation, useQuery } from 'react-query';
import { createFavorite, deleteFavorite } from '../../api/favoriteAPI';
import { Colors } from '../../constants/colors';
import { favorites, isFavScreenAtom } from '../../store/Favorites/favorites';
import { isTravScreenAtom } from '../../store/TravResScreen/TravOrRes';

const ListingOptions = ({ id, FavId }) => {
	const [fav, setFav] = useAtom(favorites);
	//const [isFavorite, setIsFavorite] = useState(fav.includes(id));
	const [travS] = useAtom(isTravScreenAtom);

	const [modalVisible, setModalVisible] = useState(false);
	const [isFavScreen] = useAtom(isFavScreenAtom);

	const { mutate, error } = useMutation(createFavorite);
	const del = useMutation(deleteFavorite);

	const modifyFavorite = async () => {
		if (!fav.includes(id)) {
			addToFavorites();
			setFav([...fav, id]);
			//setIsFavorite(true);

			//console.log(id);
			setModalVisible(true);
			setTimeout(() => {
				setModalVisible(false);
			}, 1000);
		}
		//else {
		//setFav(fav.filter((item) => item.id !== id));
		//console.log("whattttttttttt")
		//const listing = id.toString();

		// must pass favorite id
		// find from jotai state
		// filter the jotai array get the item he pressed
		// pass the favorite id.
		//del.mutate('643134bb34a66a50ffc20484');
		//}
	};
	//console.log(isFavorite);
	//console.log('The fav array:', fav);
	const deleteFav = async () => {
		const updatef = fav.filter((item) => item !== id);
		setFav(updatef);

		setModalVisible(true);
		setTimeout(() => {
			setModalVisible(false);
		}, 1000);

		del.mutate(FavId);
	};

	const addToFavorites = async () => {
		if (travS) {
			console.log('trav screen');
			const user = await AsyncStorage.getItem('userID');
			const listing = id.toString();
			const listingType = 'residentListing';

			const data = {
				user,
				listing,
				listingType,
			};
			console.log(data);

			mutate(data);
		} else {
			console.log('res screen');
			const user = await AsyncStorage.getItem('userID');
			const listing = id.toString();
			const listingType = 'traverlerListing';

			const data = {
				user,
				listing,
				listingType,
			};
			console.log(data);
			mutate(data);
		}
	};

	const optionsHandler = () => {
		console.log('Clicked 2:');
	};

	function toggleModal() {
		if (isFavScreen) {
			return (
				<View style={styles.modalView}>
					<Text style={styles.modalText}>Removed from Favorites</Text>
					<Feather name='check-circle' color={Colors.darkGreen} size={36} />
				</View>
			);
		} else {
			return (
				<View style={styles.modalView}>
					<Text style={styles.modalText}>Added to Favorites</Text>
					<Feather name='check-circle' color={Colors.darkGreen} size={36} />
				</View>
			);
		}
	}

	function theIconFav() {
		if (isFavScreen) {
			return (
				<MaterialCommunityIcons
					style={styles.optionsIcon}
					name={fav.includes(id) ? 'delete' : 'check'}
					size={20}
					color={Colors.gray}
					onPress={deleteFav}
				/>
			);
		}
		if (!isFavScreen) {
			return (
				<FontAwesome
					style={styles.optionsIcon}
					name={fav.includes(id) ? 'check' : 'bookmark-o'}
					size={18}
					color={fav.includes(id) ? Colors.darkGreen : Colors.gray}
					onPress={modifyFavorite}
				/>
			);
		}
	}
	return (
		<View style={styles.optionsWrapper}>
			<Modal
				animationType='fade'
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.centeredView}>{toggleModal()}</View>
			</Modal>
			{theIconFav()}
			<SimpleLineIcons
				style={styles.optionsIcon}
				name='options-vertical'
				size={16}
				color={Colors.gray}
				onPress={optionsHandler}
			/>
		</View>
	);
};

export default ListingOptions;

const styles = StyleSheet.create({
	optionsWrapper: {
		flexDirection: 'row',
		position: 'absolute',
		right: 3,
		zIndex: 100,
	},
	optionsIcon: {
		paddingHorizontal: 5,
		paddingVertical: 5,
	},
	//Modal Style
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalView: {
		margin: 20,
		backgroundColor: '#efefef',
		borderRadius: 10,
		padding: 20,
		alignItems: 'center',
		shadowColor: '#000',

		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 2,
	},

	modalText: {
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 20,
	},
});
