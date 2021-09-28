import React from "react";
import { Platform } from "react-native";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import Colors from "../constants/colors";
import {
  Cart,
  Home,
  Account,
  Admin,
  Order,
  Product,
  Wishlist,
  OrderDetails,
  EditProductScreen,
} from "../screens";
import CustomHeaderButton from "../components/CustomHeaderButton";
import * as RootNavigation from "./RootNavigation";

const HomeTabStack = createNativeStackNavigator();
const WishListStack = createNativeStackNavigator();
const OrderTabStack = createStackNavigator();
const UserProductStack = createStackNavigator();
const MainDrawer = createDrawerNavigator();
const Tab =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator();

const defaultStackNavigatorOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
  headerBackTitle: "Back",
};

const HomeStackScreen = () => {
  return (
    <HomeTabStack.Navigator screenOptions={{ ...defaultStackNavigatorOptions }}>
      <HomeTabStack.Screen
        name="Home"
        component={TabScreen}
        options={{ headerShown: false }}
      />
      <HomeTabStack.Screen
        name="HomeStackProductdetails"
        component={Product}
        options={{ title: "Product" }}
      />
    </HomeTabStack.Navigator>
  );
};

const WishlistStackScreen = () => {
  return (
    <WishListStack.Navigator
      screenOptions={{ ...defaultStackNavigatorOptions, headerShown: false }}
    >
      <WishListStack.Screen name="WishStackWishlist" component={Wishlist} />
    </WishListStack.Navigator>
  );
};

const OrderTabStackScreen = () => {
  return (
    <OrderTabStack.Navigator
      screenOptions={{
        headerBackTitle: "Back",
        headerTintColor:
          Platform.OS === "android" ? "white" : Colors.primaryColor,
      }}
    >
      <OrderTabStack.Screen
        name="Order"
        component={Order}
        options={{
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                iconName="ios-menu"
                onPress={() =>
                  RootNavigation.dispatchDrawer(DrawerActions.openDrawer())
                }
              />
            </HeaderButtons>
          ),
        }}
      />
      <OrderTabStack.Screen name="OrderDetails" component={OrderDetails} />
    </OrderTabStack.Navigator>
  );
};

const UserProductStackScreen = () => {
  return (
    <UserProductStack.Navigator
      screenOptions={{
        headerBackTitle: "Back",
        headerTintColor:
          Platform.OS === "android" ? "white" : Colors.primaryColor,
      }}
    >
      <UserProductStack.Screen
        name="Admin"
        component={Admin}
        options={{
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                iconName="ios-menu"
                onPress={() =>
                  RootNavigation.dispatchDrawer(DrawerActions.openDrawer())
                }
              />
            </HeaderButtons>
          ),
        }}
      />
      <UserProductStack.Screen
        name="EditProduct"
        component={EditProductScreen}
      />
    </UserProductStack.Navigator>
  );
};

const TabScreen = ({ navigation }) => {
  const TabNavProps =
    Platform.OS === "android"
      ? {
          inactiveColor: "white",
          barStyle: {
            backgroundColor: Colors.primaryColor,
            height: "9%",
            paddingTop: 5,
          },
        }
      : {
          screenOptions: {
            tabBarActiveTintColor: Colors.primaryColor,
            headerTintColor: Colors.primaryColor,
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerLeft: (props) => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  iconName="ios-menu"
                  onPress={() => navigation.openDrawer()}
                />
              </HeaderButtons>
            ),
          },
        };

  return (
    <Tab.Navigator {...TabNavProps}>
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          title: "Home",
          tabBarIcon: (tabInfo) => {
            return <Ionicons name="ios-home" size={20} color={tabInfo.color} />;
          },
        }}
      />
      <Tab.Screen
        name="CartTab"
        component={Cart}
        options={{
          title: "Cart",
          tabBarIcon: (tabInfo) => (
            <Ionicons name="ios-cart" size={25} color={tabInfo.color} />
          ),
        }}
      />
      <Tab.Screen
        name="WishlistTab"
        component={WishlistStackScreen}
        options={{
          title: "Wishlist",
          tabBarIcon: (tabInfo) => (
            <Ionicons name="ios-heart" size={25} color={tabInfo.color} />
          ),
        }}
      />
      <Tab.Screen
        name="AccountTab"
        component={Account}
        options={{
          title: "Account",
          tabBarIcon: (tabInfo) => (
            <Ionicons name="person" size={20} color={tabInfo.color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <MainDrawer.Navigator
      screenOptions={{
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              iconName="ios-menu"
              onPress={() =>
                RootNavigation.dispatchDrawer(DrawerActions.openDrawer())
              }
            />
          </HeaderButtons>
        ),
        drawerActiveBackgroundColor: Colors.primaryColor,
        drawerActiveTintColor: "white",
        headerTintColor: Colors.primaryColor,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
      }}
    >
      <MainDrawer.Screen
        name="Shop"
        component={HomeStackScreen}
        options={{
          headerShown: false,
          drawerIcon: (props) => {
            return (
              <Ionicons
                name="ios-cart"
                color={props.focused ? "white" : Colors.primaryColor}
                size={20}
              />
            );
          },
        }}
      />
      <MainDrawer.Screen
        name="OrderDrawer"
        component={OrderTabStackScreen}
        options={{
          headerShown: false,
          drawerIcon: (props) => {
            return (
              <Ionicons
                name="ios-list"
                color={props.focused ? "white" : Colors.primaryColor}
                size={20}
              />
            );
          },
          title: "Your Order",
          drawerLabel: "Order",
        }}
      />
      <MainDrawer.Screen
        name="AdminDrawer"
        component={UserProductStackScreen}
        options={{
          drawerIcon: (props) => {
            return (
              <Ionicons
                name="ios-person"
                color={props.focused ? "white" : Colors.primaryColor}
                size={20}
              />
            );
          },
          title: "Admin",
          headerShown: false,
        }}
      />
    </MainDrawer.Navigator>
  );
};

const Route = () => {
  return (
    <NavigationContainer ref={RootNavigation.navigationRef}>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default Route;
