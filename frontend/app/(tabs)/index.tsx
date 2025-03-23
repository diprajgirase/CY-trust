import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const HomeScreen = () => {
  const data = [
    { title: "Governments", icon: "business-outline" },
    { title: "Banks", icon: "cash-outline" },
    { title: "Companies", icon: "briefcase-outline" },
    { title: "Others", icon: "layers-outline" },
  ];
  

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#100a0c" }}>
      {/* Header Section */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 20,
        }}
      >
        {/* Hi Dip (Left Side) */}
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>Hi Dip!</Text>

        {/* Notification Button (Right Side) */}
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Circular Score Indicator */}
      <View
        style={{
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          width: 150,
          height: 150,
          borderRadius: 75,
          backgroundColor: "#2d0d04",
          shadowColor: "#ff8800",
          shadowOpacity: 0.8,
          shadowRadius: 15,
          shadowOffset: { width: 0, height: 10 },
          elevation: 10,
          marginVertical: 30,
        }}
      >
        <Text style={{ color: "#ff8800", fontSize: 28, fontWeight: "bold" }}>2.0</Text>
        <Text style={{ color: "#fff", fontSize: 14 }}>out of 5</Text>
      </View>

      {/* Report Spam Button */}
      <TouchableOpacity
        style={{
          backgroundColor: "#d62828",
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 25,
          alignSelf: "center",
          shadowColor: "#d62828",
          shadowOpacity: 0.6,
          shadowRadius: 10,
          elevation: 5,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Report Spam</Text>
      </TouchableOpacity>

      {/* Inspected Items Grid (2x2) */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          padding: 20,
          marginTop: 30,
        }}
      >
        {data.map((item, index) => (
          <View
            key={index}
            style={{
              width: "48%", // Two in a row
              aspectRatio: 1, // Square shape
              backgroundColor: "#1d0f17",
              borderRadius: 15,
              padding: 15,
              justifyContent: "space-between",
              shadowColor: "#ff00ff",
              shadowOpacity: 0.2,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 5 },
              elevation: 5,
              marginVertical: 10, // Proper spacing from top and bottom
            }}
          >
            {/* Icon & Title */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name={item.icon} size={18} color="#ffffff" style={{ marginRight: 5 }} />
              <Text style={{ color: "#ffffff", fontSize: 14, fontWeight: "bold" }}>{item.title}</Text>
            </View>

            {/* "What's this?" Text */}
            <Text style={{ color: "#a020f0", fontSize: 12, marginTop: 5 }}>What's this?</Text>

            {/* Enable Button */}
            <TouchableOpacity
              style={{
                backgroundColor: "#800080",
                borderRadius: 20,
                paddingVertical: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>Enable</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
