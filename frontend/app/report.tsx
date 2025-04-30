import React from "react";
import { View, StyleSheet, Text, Linking, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ReportScreen = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.heading}>File a Scam Report</Text>
      </View>

      {/* Content below the header */}
      <View style={styles.content}>
        <Text style={styles.instruction}>Kindly follow one method to file the report:</Text>

        <View style={styles.card}>
          <View style={styles.procedure}>
            <Text style={styles.number}>1.</Text>
            <Text style={styles.text}>Visit the official cybercrime reporting portal: <Text style={styles.link} onPress={() => Linking.openURL('https://cybercrime.gov.in')}>cybercrime.gov.in</Text></Text>
          </View>

          <View style={styles.procedure}>
            <Text style={styles.number}>2.</Text>
            <Text style={styles.text}>Call the national cybercrime helpline: <Text style={styles.bold}>1930</Text></Text>
          </View>

          <View style={styles.procedure}>
            <Text style={styles.number}>3.</Text>
            <Text style={styles.text}>Locate and visit your nearest cyber crime cell. <Text style={styles.link} onPress={() => Linking.openURL('https://cybercrime.gov.in/')}>(Find here)</Text></Text>
          </View>
        </View>

        <Text style={styles.importantHeading}>Important Information to Keep Ready:</Text>
        <View style={styles.infoCard}>
          <Text style={styles.mandatory}>Mandatory Details</Text>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={20} color="#03dac6" style={styles.icon} />
            <Text style={styles.infoText}>Incident Date and Time.</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="document-text-outline" size={20} color="#03dac6" style={styles.icon} />
            <Text style={styles.infoText}>Detailed description of the incident (minimum 200 characters, avoid special characters like #$@^*`~|!).</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="image-outline" size={20} color="#03dac6" style={styles.icon} />
            <Text style={styles.infoText}>Soft copy of a National ID (Voter ID, Driving License, Passport, PAN Card, Aadhar Card) in .jpeg, .jpg, or .png format (maximum file size: 5 MB).</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#1e1e1e", // Ensure header background matches container
    paddingTop: 15, // Add top padding for status bar
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2c2c2c', // Optional: Add a subtle bottom border
  },
  backButton: {
    zIndex: 1,
    borderRadius: 15,
    padding: 8,
    marginRight: 10,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
    textAlign: 'left',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20, // Add some top padding below the header
  },
  instruction: {
    fontSize: 18,
    color: "#d4d4d4",
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: "#2c2c2c",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  procedure: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  number: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00bcd4",
    marginRight: 12,
  },
  text: {
    fontSize: 17,
    color: "#e0e0e0",
    flexShrink: 1,
    lineHeight: 24,
  },
  link: {
    color: "#80cbc4",
    textDecorationLine: "underline",
  },
  bold: {
    fontWeight: "bold",
    color: "#00bcd4",
  },
  importantHeading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffc107",
    marginTop: 25,
    marginBottom: 15,
  },
  infoCard: {
    backgroundColor: "#2c2c2c",
    borderRadius: 10,
    padding: 20,
  },
  mandatory: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  icon: {
    marginRight: 10,
  },
  infoText: {
    fontSize: 17,
    color: "#e0e0e0",
    flexShrink: 1,
    lineHeight: 24,
  },
});

export default ReportScreen;