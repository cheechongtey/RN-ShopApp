import React, { useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import {
  updateWishlistAction,
  updateCartAction,
} from "../store/actions/actionsList";
import Colors from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

const ItemGridTile = ({ item }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const wishListObj = useSelector((state) => state.product.wishListObj);
  const TouchComponent =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  return (
    <TouchComponent
      style={styles.gridItem}
      onPress={() =>
        navigation.navigate("HomeStackProductdetails", {
          productId: item.id,
        })
      }
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageBackground
            source={{ uri: item.imageUrl }}
            style={styles.imageBackground}
            resizeMode="cover"
          >
            <TouchComponent
              style={styles.shop}
              onPress={() =>
                dispatch(
                  updateCartAction({
                    type: "ADD",
                    product: {
                      id: item.id,
                      quantity: 1,
                      sum: Math.floor(item.price * 1 * 100) / 100,
                    },
                  })
                )
              }
            >
              <Text>
                <Ionicons
                  name="ios-cart"
                  size={18}
                  color={Colors.primaryColor}
                />
              </Text>
            </TouchComponent>
            <TouchComponent
              style={styles.wishlist}
              onPress={() => dispatch(updateWishlistAction({ id: item.id }))}
            >
              <Text>
                <Ionicons
                  name="ios-heart"
                  size={18}
                  color={
                    wishListObj.filter((x) => x.id === item.id).length !== 0
                      ? "red"
                      : "#ccc"
                  }
                />
              </Text>
            </TouchComponent>
          </ImageBackground>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>RM{item.price}</Text>
          </View>
        </View>
      </View>
    </TouchComponent>
  );
};

export default ItemGridTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    borderRadius: 5,
    overflow:
      Platform.OS === "android" && Platform.Version >= 21
        ? "hidden"
        : "visible",
    marginBottom: 15,
    marginHorizontal: 8,
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: "100%",
    borderRadius: 5,
    overflow: "hidden",
  },
  imageContainer: {
    height: 200,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  detailsContainer: {
    flex: 1,
    padding: 7,
    paddingVertical: 5,
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primaryColor,
  },
  priceContainer: {
    marginTop: 5,
  },
  wishlist: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 40,
    right: 5,
    padding: 5,
    borderRadius: 20,
  },
  shop: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 5,
    right: 5,
    padding: 5,
    borderRadius: 20,
  },
});
