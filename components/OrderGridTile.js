import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Colors from "../constants/colors";

const OrderGridTile = ({ item }) => {
  const navigation = useNavigation();
  const obj = item.item;
  const TouchComponent =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  return (
    <View style={styles.gridItem}>
      <TouchComponent
        style={styles.container}
        onPress={() =>
          navigation.navigate("OrderDetails", {
            orderId: obj.id,
          })
        }
      >
        <View style={styles.detailsContainer}>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.invoiceTitle}>{obj.id}</Text>
            <Text style={styles.invoiceDate}>{obj.readableDate}</Text>
          </View>
          <View>
            <Text style={styles.price}>
              RM {parseFloat(obj.totalAmount).toFixed(2)}
            </Text>
          </View>
        </View>
      </TouchComponent>
    </View>
  );
};

export default OrderGridTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 10,
    overflow: "hidden",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    overflow: "hidden",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
  },
  detailsContainer: {
    flex: 1,
    padding: 10,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    borderLeftColor: "green",
    borderLeftWidth: 8,
  },
  invoiceTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  invoiceDate: {
    fontSize: 15,
    color: "#ccc",
    fontWeight: "bold",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primaryColor,
  },
  desc: {
    color: "#ccc",
  },
});
