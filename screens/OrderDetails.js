import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";

import Items from "../components/OrderDetailsGridTile";
import Colors from "../constants/colors";

const OrderDetails = () => {
  const route = useRoute();
  const orderId = route.params.orderId;
  const orderObj = useSelector((state) => state.cart.orderObj);
  const productObj = useSelector((state) => state.product.productObj);
  const [itemsObj, setItemsObj] = useState([]);

  useEffect(() => {
    if (orderId && orderObj && orderObj.length !== 0) {
      let filtered = orderObj.find((x) => x.id === orderId);

      if (filtered && Object.values(filtered).length !== 0) {
        let orderItems = filtered.items.map((x) => {
          let filteredProduct = productObj.find((prod) => prod.id === x.id);

          return {
            ...x,
            ...filteredProduct,
          };
        });

        setItemsObj(orderItems);
      }
    }
  }, [orderObj, orderObj]);

  return (
    <View style={styles.container}>
      <FlatList
        data={itemsObj}
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

export default OrderDetails;

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
