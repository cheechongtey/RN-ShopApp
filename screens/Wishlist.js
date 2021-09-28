import React, { useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Platform } from "react-native";
import { useSelector } from "react-redux";
import { Button } from "react-native-elements";

import Items from "../components/WishlistItemTile";
import Colors from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

const Wishlist = () => {
  const wishlistObj = useSelector((state) => state.product.wishListObj);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: "Wishlist",
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={wishlistObj}
        renderItem={(item) => <Items item={item} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <Text style={{ fontStyle: "italic" }}>
              You haven't added any product to wishlist yet.
            </Text>
            <Button
              title="Start Shopping"
              titleStyle={{
                color:
                  Platform.OS === "android" && Platform.Version >= 21
                    ? "white"
                    : Colors.primaryColor,
              }}
              buttonStyle={styles.button}
              type={
                Platform.OS === "android" && Platform.Version >= 21
                  ? "solid"
                  : "clear"
              }
              onPress={() =>
                navigation.navigate("HomeTab", {
                  screen: "HomeStackHome",
                })
              }
            />
          </View>
        )}
      />
    </View>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  button: {
    marginTop: 15,
    backgroundColor:
      Platform.OS === "android" && Platform.Version >= 21
        ? Colors.primaryColor
        : "#0000",
  },
});
