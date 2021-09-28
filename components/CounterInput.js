import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";

const CounterInput = (props) => {
  return (
    <View>
      <Button title="-" />
      <Text>1</Text>
    </View>
  );
};

export default CounterInput;

const styles = StyleSheet.create({});
