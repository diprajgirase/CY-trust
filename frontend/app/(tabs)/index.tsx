import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";  // Import Lottie

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const data = [
    { title: "Governments", icon: "business-outline" },
    { title: "Banks", icon: "cash-outline" },
    { title: "Companies", icon: "briefcase-outline" },
    { title: "Others", icon: "layers-outline" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#100a0c", padding: 20 }}>
      {/* Header Section */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>Hi Dip!</Text>

        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Lottie Animation (Local + URL Fallback) */}
      <View style={{ alignItems: "center", marginVertical: 20 }}>
        {/* <LottieView
          source={require("../../assets/Animation.json")} // Local file
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        /> */}
        
        {/* URL-based Lottie (If the local file doesn't work) */}
        <LottieView
          source={{ uri: "https://assets2.lottiefiles.com/packages/lf20_j1adxtyb.json" }}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
       
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
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Report Spam</Text>
      </TouchableOpacity>

      {/* Inspected Items Grid (2x2) */}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {data.map((item, index) => (
          <View
            key={index}
            style={{
              width: width * 0.42,
              aspectRatio: 1,
              backgroundColor: "#1d0f17",
              borderRadius: 15,
              padding: 15,
              justifyContent: "space-between",
              shadowColor: "#ff00ff",
              shadowOpacity: 0.2,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 5 },
              elevation: 5,
              marginVertical: 10,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name={item.icon} size={18} color="#ffffff" style={{ marginRight: 5 }} />
              <Text style={{ color: "#ffffff", fontSize: 14, fontWeight: "bold" }}>{item.title}</Text>
            </View>

            <Text style={{ color: "#a020f0", fontSize: 12, marginTop: 5 }}>What's this?</Text>

            <TouchableOpacity
              style={{
                backgroundColor: "#800080",
                borderRadius: 20,
                paddingVertical: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>Chat</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default HomeScreen;
