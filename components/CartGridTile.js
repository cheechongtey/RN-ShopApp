import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/colors";
import { useDispatch } from "react-redux";

import { updateCartAction } from "../store/actions/actionsList";
import colors from "../constants/colors";

const CartGridTile = ({ item }) => {
  const obj = item.item;
  const dispatch = useDispatch();
  const TouchComponent =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  const addToCart = (type, product) => {
    dispatch(
      updateCartAction({
        type,
        product,
      })
    );
  };

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
          <Text style={styles.price}>RM {parseFloat(obj.sum).toFixed(2)}</Text>
        </View>
        <View style={styles.counterContainer}>
          <View style={styles.counter}>
            <TouchComponent
              style={{
                justifyContent: "center",
                padding: 5,
                backgroundColor: colors.primaryColor,
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
              }}
              onPress={() =>
                addToCart("REMOVE", {
                  id: obj.id,
                  quantity: 1,
                  sum: Math.floor(obj.price * 1 * 100) / 100,
                })
              }
            >
              <Text>
                <Ionicons name="ios-remove" size={20} color="white" />
              </Text>
            </TouchComponent>
            <TextInput style={styles.textInput} editable={false}>
              {obj.quantity}
            </TextInput>
            <TouchComponent
              style={{
                justifyContent: "center",
                padding: 5,
                backgroundColor: colors.primaryColor,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
              }}
              onPress={() =>
                addToCart("ADD", {
                  id: obj.id,
                  quantity: 1,
                  sum: Math.floor(obj.price * 1 * 100) / 100,
                })
              }
            >
              <Text>
                <Ionicons name="ios-add" size={20} color="white" />
              </Text>
            </TouchComponent>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartGridTile;

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
    flex: 2,
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
  counterContainer: {
    flex: 1,

    justifyContent: "center",
  },
  counter: {
    flexDirection: "row",
    // justifyContent: "center",
    height: 30,
  },
  textInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    flex: 2,
    textAlign: "center",
  },
});
