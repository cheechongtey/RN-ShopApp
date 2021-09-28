import React from "react";
import { Provider } from "react-redux";
import "react-native-gesture-handler";
// import * as Font from "expo-font";
// import AppLoading from "expo-app-loading";
// import { enableScreens } from "react-native-screens";

import store from "./store/store";
import MainNavigation from "./routes";

// enableScreens();

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}
