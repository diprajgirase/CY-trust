import { View, Text, StatusBar } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const TabRoot = () => {
  return (
    <>
      {/* Show Notification Bar */}
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <Tabs
        screenOptions={{
          headerShown: false, // Hides the header globally for all screens
        }}
      >
        <Tabs.Screen name="messages" options={{ title: "Messages" }} />
        <Tabs.Screen name="products" options={{ title: "Products" }} />
        <Tabs.Screen name="index" options={{ title: "Home" }} />
        <Tabs.Screen name="scams" options={{ title: "Scams" }} />
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      </Tabs>
    </>
  );
};

export default TabRoot;
