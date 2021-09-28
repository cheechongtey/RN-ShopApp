import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View, TextInput } from "react-native";
import { useRoute } from "@react-navigation/native";

import Colors from "../constants/colors";
import { useSelector } from "react-redux";

const OrderDetailsGridTile = ({ item }) => {
  const obj = item.item;

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
            <TextInput style={styles.textInput} editable={false}>
              {obj.quantity}
            </TextInput>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderDetailsGridTile;

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
