import React, { useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { useSelector } from "react-redux";

import ItemList from "../components/ItemGridTile";

const Home = (props) => {
  const productObj = useSelector((state) => state.product.productObj);

  useEffect(() => {
    // props.navigation.setOptions({
    //   title: "Test 123",
    // });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#0000", paddingTop: 20 }}>
      <FlatList
        data={productObj}
        numColumns={2}
        renderItem={(obj) => (
          <ItemList item={obj.item} navigation={props.navigation} />
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
