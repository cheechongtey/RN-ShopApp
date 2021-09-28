import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/colors";
import { useDispatch } from "react-redux";

import { updateWishlistAction } from "../store/actions/actionsList";

const WishlistItemTile = ({ item }) => {
  const obj = item.item;
  const dispatch = useDispatch();
  const TouchComponent =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  return (
    <View style={styles.gridItem}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: obj.imageUrl }}
            style={styles.imageBackground}
            resizeMode="cover"
          />
        </View>
        <View style={styles.detailsContainer}>
          <View>
            <Text style={styles.title}>{obj.title}</Text>
            <Text style={styles.desc}>Lorem ipsum</Text>
          </View>
          <Text style={styles.price}>RM {obj.price}</Text>
        </View>
        <TouchComponent
          style={styles.actionContainer}
          onPress={() => dispatch(updateWishlistAction({ id: obj.id }))}
        >
          <Text style={styles.title}>
            <Ionicons name="ios-trash" color={Colors.primaryColor} size={25} />
          </Text>
        </TouchComponent>
      </View>
    </View>
  );
};

export default WishlistItemTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 0.4,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    overflow: "hidden",
  },
  imageContainer: {
    height: 80,
    width: 80,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    padding: 7,
    paddingVertical: 5,
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primaryColor,
  },
  desc: {
    color: "#ccc",
  },
  actionContainer: {
    justifyContent: "center",
  },
});
