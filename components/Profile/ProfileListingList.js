import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState } from "react";
import Listing from "../Item/Listing";
import { getResidentListings } from "../../api/residentListingsAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "react-query";
import LoadingIcon from "../Loading/LoadingIcon";
import { RefreshControl } from "react-native-gesture-handler";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useEffect } from "react";
import { getResidentListingByUserId } from "../../api/residentListingsAPI";

async function getUserId() {
  try {
    const userID = await AsyncStorage.getItem("userID");
    return userID;
  } catch (err) {
    console.log(err);
    throw new Error("unable to retreive userid");
  }
}

const ProfileListingList = ({ userIdProps }) => {
  //const [userId, setUserId] = useState();
  const navigation = useNavigation();
  

  const { data: userIdFetched, isFetching: isFetchingUserId, refetch: refetchUserId } = useQuery(
    "userId",
    getUserId, {
      refetchOnMount: true
    }
  );

  const userId = userIdProps ? userIdProps : userIdFetched

  console.log(userId)

  const {
    data: residentListingsbyUserID,
    isLoading,
    isError,
    isFetching,
    refetch,
    error
  } = useQuery(
    ["residentListingByID", userId],
    () => getResidentListingByUserId(userId),
    { enabled: !!userId, staleTime: 0 }
  );

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [userId])
  );


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
        data={residentListingsbyUserID}
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
