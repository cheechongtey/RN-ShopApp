import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Dimensions,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Rating, Button } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import {
  updateWishlistAction,
  updateCartAction,
} from "../store/actions/actionsList";

import colors from "../constants/colors";

const Product = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params;

  const productList = useSelector((x) => x.product.productObj);
  const wishListObj = useSelector((state) => state.product.wishListObj);
  const cartObj = useSelector((state) => state.cart.cartObj);

  const [productObj, setProductObj] = useState({});

  const TouchComponent =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  const addToCart = (product) => {
    dispatch(
      updateCartAction({
        type: "ADD",
        product,
      })
    );

    Alert.alert("Added product to cart", "", [
      {
        text: "Checkout",
        onPress: () => navigation.navigate("CartTab"),
        style: "cancel",
      },
      { text: "OK" },
    ]);
  };

  useEffect(() => {
    if (params && params.productId && productList.length !== 0) {
      const selected = productList.find((x) => x.id === params.productId);

      if (selected && Object.values(selected).length !== 0) {
        navigation.setOptions({
          title: selected.title,
        });

        setProductObj(selected);
      }
    }
  }, [params]);

  useEffect(() => {
    // console.log(cartObj);
  }, [cartObj]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ScrollView>
          <View style={styles.imageContainer}>
            <ImageBackground
              style={styles.imageBackground}
              source={{ uri: productObj.imageUrl }}
              resizeMode="contain"
            >
              <TouchComponent
                style={styles.wishlist}
                onPress={() =>
                  dispatch(updateWishlistAction({ id: productObj.id }))
                }
              >
                <Text>
                  <Ionicons
                    name="ios-heart"
                    size={18}
                    color={
                      wishListObj.filter((x) => x.id === productObj.id)
                        .length !== 0
                        ? "red"
                        : "#ccc"
                    }
                  />
                </Text>
              </TouchComponent>
            </ImageBackground>
          </View>
          <View style={styles.productDetails}>
            <View style={styles.productInfo}>
              <View style={styles.titleSection}>
                <Text style={styles.title}>{productObj.title}</Text>
                <Text style={styles.categories}>Lorem Ipsum</Text>
              </View>
              <View style={styles.priceSection}>
                <Text style={styles.price}>RM {productObj.price}</Text>
              </View>
            </View>
            <View style={styles.ratingSection}>
              <Rating
                imageSize={20}
                ratingColor={colors.primaryColor}
                type="custom"
              />
            </View>
            <View style={styles.descSection}>
              <Text style={styles.description}>
                {productObj.description} Lorem Ipsum is simply dummy text of the
                printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a
                type specimen book. It has survived not only five centuries, but
                also the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsum.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <Button
          containerStyle={styles.button}
          buttonStyle={{
            paddingVertical: 13,
            backgroundColor: colors.primaryColor,
          }}
          title="Add to Cart"
          onPress={() =>
            addToCart({
              id: productObj.id,
              quantity: 1,
              sum: Math.floor(productObj.price * 1 * 100) / 100,
            })
          }
        />
        <Button
          containerStyle={styles.button}
          buttonStyle={{
            paddingVertical: 13,
            backgroundColor: colors.primaryColor,
          }}
          title="Buy Now"
        />
      </View>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
  },
  footer: {
    width: "100%",
    height: "12%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  imageContainer: {
    height: Dimensions.get("window").height * 0.35,
    backgroundColor: "#ccc",
  },
  imageBackground: {
    height: "100%",
    width: "100%",
  },
  productDetails: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  productInfo: {
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  titleSection: {
    flex: 2,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 5,
  },
  categories: {
    fontSize: 15,
    fontWeight: "600",
    color: "#bebebe",
  },
  priceSection: {
    alignItems: "center",
  },
  price: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.primaryColor,
  },
  ratingSection: {
    paddingVertical: 20,
    alignItems: "flex-start",
  },
  description: {
    lineHeight: 22,
    fontSize: 16,
    textAlign: "justify",
  },
  button: {
    flex: 0.35,
    borderRadius: 10,
  },
  wishlist: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 5,
    right: 10,
    padding: 5,
    borderRadius: 20,
  },
});
