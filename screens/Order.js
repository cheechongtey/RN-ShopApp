import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector } from "react-redux";

import Items from "../components/OrderGridTile";

const Order = () => {
  const orderObj = useSelector((state) => state.cart.orderObj);

  return (
    <View style={styles.container}>
      <FlatList
        data={orderObj}
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
              No order has been placed yet.
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default Order;

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
