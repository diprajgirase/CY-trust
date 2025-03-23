import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, StatusBar, Dimensions, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const scamsData = [
  { 
    id: '1', 
    title: 'Online Banking Fraud', 
    date: 'March 20, 2025', 
    description: 'Scammers trick victims into sharing banking details via fake websites or calls. They often use phishing techniques and fake banking apps to steal money.'
  },
  { 
    id: '2', 
    title: 'Fake Job Offer Scam', 
    date: 'March 18, 2025', 
    description: 'Fraudulent companies ask for upfront payments for fake job offers, promising high salaries but disappearing after collecting fees from job seekers.' 
  },
  { 
    id: '3', 
    title: 'Lottery Scam', 
    date: 'March 15, 2025', 
    description: 'Victims are told they won a lottery but need to pay fees to claim it. Scammers send fake certificates and demand bank details.' 
  },
  { 
    id: '4', 
    title: 'Investment Scam', 
    date: 'March 10, 2025', 
    description: 'Scammers promise unrealistic returns on investments in fake companies or crypto schemes, luring victims into Ponzi schemes.' 
  },
  { 
    id: '5', 
    title: 'Online Shopping Scam', 
    date: 'March 5, 2025', 
    description: 'Fake e-commerce websites trick users into buying products that never get delivered. Payment is taken, but no item is shipped.' 
  },
];

const Scams = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <Text style={styles.heading}>Recent Scams</Text>
        <FlatList
          data={scamsData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.scamItem}>
              <Text style={styles.scamTitle}>{item.title}</Text>
              <Text style={styles.scamDate}>{item.date}</Text>
              <Text style={styles.scamDescription} numberOfLines={2}>
                {item.description}
              </Text>
              <TouchableOpacity style={styles.viewMoreButton}>
                <Text style={styles.viewMoreText}>View More</Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10, 
    marginLeft: 10,
    letterSpacing: 1,
    marginTop: 15, // Added margin for better spacing
  },
  listContent: {
    paddingBottom: 20,
  },
  scamItem: {
    backgroundColor: '#1c1c1e',
    padding: 18,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#fff',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 4,
    width: width * 0.9,
    alignSelf: 'center',
  },
  scamTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e94560',
  },
  scamDate: {
    fontSize: 14,
    color: '#bbb',
    marginBottom: 5,
  },
  scamDescription: {
    fontSize: 15,
    color: '#bbb',
    marginTop: 6,
    lineHeight: 20,
  },
  viewMoreButton: {
    backgroundColor: '#e94560',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  viewMoreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default Scams;
