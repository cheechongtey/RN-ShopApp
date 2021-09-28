import React, { useEffect } from "react";
import { FlatList, Button, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../components/ProductItem";
import Colors from "../constants/colors";
import CustomHeaderButton from "../components/CustomHeaderButton";

import { deleteUserProducts } from "../store/actions/actionsList";

const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.product.userProducts);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const editProductHandler = (id) => {
    navigation.navigate("EditProduct", {
      productId: id,
    });
  };

  const deleteHandler = (id) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(deleteUserProducts({ id }));
        },
      },
    ]);
  };

  useEffect(() => {
    console.log(userProducts);
  }, [userProducts]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            iconName="ios-create"
            onPress={() => navigation.navigate("EditProduct")}
          />
        </HeaderButtons>
      ),
    });
  }, []);

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
        >
          <Button
            color={Colors.primaryColor}
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button
            color={Colors.primaryColor}
            title="Delete"
            onPress={deleteHandler.bind(this, itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

export default UserProductsScreen;
