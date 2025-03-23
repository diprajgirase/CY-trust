import { StatusBar, Dimensions } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome, Entypo } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const TabRoot = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#100a0c" />

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#100a0c",
            paddingTop: 9,
            paddingBottom: 15,
            height: 65,
          },
          tabBarActiveTintColor: "#ffffff",
          tabBarInactiveTintColor: "#888",
          tabBarLabelStyle: {
            fontSize: width > 360 ? 12 : 10, // Adjust font size based on screen width
          },
          tabBarIconStyle: {
            alignSelf: "center",
          },
        }}
      >
        <Tabs.Screen
          name="scams"
          options={{
            title: "Scams",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user-secret" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="messages"
          options={{
            title: "Messages",
            tabBarIcon: ({ color }) => (
              <Entypo name="message" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="home" size={32} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="products"
          options={{
            title: "Products",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="shopping-bag" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabRoot;