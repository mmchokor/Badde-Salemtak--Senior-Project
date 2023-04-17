import { StyleSheet, Text, View, FlatList } from "react-native";
import React, {useState} from "react";
import Listing from "../Item/Listing";
import { getResidentListings } from "../../api/residentListingsAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "react-query";
import LoadingIcon from "../Loading/LoadingIcon";
import { RefreshControl } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";


async function getUserId() {
  try {
    const userID = await AsyncStorage.getItem("userID");
    return userID;
  } catch (err) {
    console.log(err);
    throw new Error("unable to retreive userid");
  }
}

const ProfileListingList = ({userIdProps}) => {
    const [userId, setUserId] = useState();
    const navigation = useNavigation()
  let listing = [];

  const { data: userIdFetched } = useQuery("userId", getUserId);

  useEffect(() => {
    if (!!userIdProps == false) {
        setUserId(userIdFetched)
      }
      else {
        setUserId(userIdProps)
      }
  }, [])

  
console.log(userId)
  

  const {
    data: residentListings,
    isFetching: fetchingResident,
    isError,
    error,
    isLoading,
    refetch,
    isFetching,
  } = useQuery("traverlerLisitngs", getResidentListings, {
    staleTime: 0,
    enabled: !!userId,
  });

  if (!fetchingResident) {
    //console.log(residentListings[0].user._id)
    listing = residentListings.filter((listing) => {
      return listing.user._id === userId;
    });
  }

  //console.log(listing)

  if (isLoading) {
    return <LoadingIcon />;
  }

  if (isError) {
    return <Text>{error.message}</Text>;
  }

  return (
    <View style={styles.wrapper}>
      <FlatList
        
        refreshing={isFetching}
        windowSize={10}
        onRefresh={() => refetch()}
        showsVerticalScrollIndicator={false}
        data={listing}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Listing
            onPress={() =>
              navigation.navigate("ItemDetails", {
                id: item._id,
                title: item.name,
                location: item.cityOfResidence,
                rating: 4,
                type: item.productType,
                price: item.price,
                quantity: item.quantity,
                weight: item.approximateWeight,
                username: item.user.firstname + " " + item.user.lastname,
                imageSrc: item.imageCover,
                timePosted: item.createdAt,
                moreD: item.description,
                prefPayment: item.paymentMethod,
              })
            }
            id={item._id}
            title={item.name}
            location={item.cityOfResidence}
            rating={4}
            type={item.productType}
            price={item.price}
            quantity={item.quantity}
            weight={item.approximateWeight}
            username={item.user.firstname + " " + item.user.lastname}
            imageSrc={item.imageCover}
            timePosted={item.createdAt}
            moreD={item.description}
            prefPayment={item.paymentMethod}
          />
        )}
      />
    </View>
  );
};

export default ProfileListingList;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginHorizontal: 4, //15
  },
});
