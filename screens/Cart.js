import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import Items from "../components/CartGridTile";
import Colors from "../constants/colors";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { submitOrderAction } from "../store/actions/actionsList";

const Cart = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cartObj =
    useSelector((state) => {
      let obj = Object.entries(state.cart.cartObj).map(([key, value]) => {
        let product = state.product.productObj.find((x) => x.id === key);

        return {
          ...value,
          ...product,
        };
      });

      return obj;
    }) || [];

  const submitCart = () => {
    dispatch(submitOrderAction());

    Alert.alert("Successfully placed order", "Your cart will be cleared now.", [
      {
        text: "Back to Shopping",
        onPress: () => navigation.navigate("HomeTab"),
        style: "cancel",
      },
    ]);
  };

  useEffect(() => {
    navigation.setOptions({
      title: "Cart",
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item iconName="ios-save" onPress={() => submitCart()} />
        </HeaderButtons>
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={cartObj}
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

export default Cart;

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
