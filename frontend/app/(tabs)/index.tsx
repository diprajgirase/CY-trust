import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation();
  const data = [
    { title: "Governments", icon: "business-outline" },
    { title: "Banks", icon: "cash-outline" },
    { title: "Companies", icon: "briefcase-outline" },
    { title: "Others", icon: "layers-outline" },
  ];

  const handleReportSpamPress = () => {
    navigation.navigate("report");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#0e0e0e", padding: 20 }}>
      {/* Header */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>Hi Dip!</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Lottie Animation */}
      <View style={{ alignItems: "center", marginVertical: 20 }}>
        <LottieView
          source={{
            uri: "https://lottie.host/0ce7a926-50af-4deb-b9d0-2967d24ff8dd/ZU9PMnZtNh.lottie",
          }}
          autoPlay
          loop
          style={{ width: 300, height: 230 }}
        />
      </View>

      {/* Report Spam Button */}
      <TouchableOpacity
        style={{
          backgroundColor: "#e11d48",
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 25,
          alignSelf: "center",
          shadowColor: "#e11d48",
          shadowOpacity: 0.6,
          shadowRadius: 20,
          elevation: 8,
          marginBottom: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #f5365c, #d92047)",
          transform: [{ scale: 1.05 }],
        }}
        activeOpacity={0.7}
        onPress={handleReportSpamPress}
      >
        <Ionicons
          name="warning-outline"
          size={20}
          color="#fff"
          style={{ marginRight: 10 }}
        />
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Report Spam</Text>
      </TouchableOpacity>

      {/* Grid Cards */}
      <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
        {data.map((item, index) => {
          let description = "";
          if (item.title === "Governments") {
            description = "Protect from scams impersonating agencies.";
          } else if (item.title === "Banks") {
            description = "Stay safe from fake banking alerts.";
          } else if (item.title === "Companies") {
            description = "Avoid frauds by fake companies.";
          } else if (item.title === "Others") {
            description = "Beware of unknown scam attempts.";
          }

          return (
            <View
              key={index}
              style={{
                width: width * 0.42,
                aspectRatio: 1,
                backgroundColor: "#1a1a1a",
                borderRadius: 15,
                padding: 15,
                justifyContent: "space-between",
                shadowColor: "#38bdf8",
                shadowOpacity: 0.2,
                shadowRadius: 6,
                elevation: 4,
                marginVertical: 10,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name={item.icon} size={18} color="#38bdf8" style={{ marginRight: 6 }} />
                <Text style={{ color: "#ffffff", fontSize: 14, fontWeight: "bold" }}>{item.title}</Text>
              </View>
              <Text style={{ color: "#aaa", fontSize: 12, marginTop: 5 }}>
                {description}
              </Text>

              <TouchableOpacity
                style={{
                  backgroundColor: "#38bdf8",
                  borderRadius: 20,
                  paddingVertical: 8,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#000", fontWeight: "bold", fontSize: 14 }}>Chat</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default HomeScreen;